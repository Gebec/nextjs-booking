import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'

import { EPricePicker } from '../../enums/price-picker.enum'
import { EInstantBookable } from '../../enums/instant-bookable.enum'
import { getCaravansData } from '../../utils/caravans-service'

import type { TVehicleType, ICaravan } from '../../../pages/api/interfaces'
import type { IContext } from './context.interface'
import type { ICaravansData } from '../../utils/caravans-service'

const Context = createContext<IContext>({
  caravans: [],
  setCaravans: () => {},
  instantBookable: EInstantBookable.YES,
  setInstantBookable: () => {},
  selectedTypes: [],
  setSelectedTypes: () => {},
  minPrice: EPricePicker.MIN_VALUE,
  setMinPrice: () => {},
  maxPrice: EPricePicker.MAX_VALUE,
  setMaxPrice: () => {},
  setPage: () => {},
  isMoreResults: true,
  setMoreResults: () => {},
  isDataLoading: false,
  isPageLoading: false,
  isError: false
})
export const useCaravansContext = () => useContext(Context)

export const ContextProvider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const [caravans, setCaravans] = useState<ICaravan[]>([])
  const [instantBookable, setInstantBookable] = useState(EInstantBookable.ALL)
  const [selectedTypes, setSelectedTypes] = useState<TVehicleType[]>([])
  const [minPrice, setMinPrice] = useState(EPricePicker.MIN_VALUE)
  const [maxPrice, setMaxPrice] = useState(EPricePicker.MAX_VALUE)
  const [page, setPage] = useState(1)
  const [isMoreResults, setMoreResults] = useState(true)
  const [isDataLoading, setDataLoading] = useState(false)
  const [isPageLoading, setPageLoading] = useState(false)
  const [isError, setError] = useState(false)

  const initialLoad = useRef(true)

  const getFilterData = useCallback(async () => {
    if (initialLoad.current) {
      initialLoad.current = false
      return
    }

    try {
      setDataLoading(true)
      setError(false)
      const { data, hasNextPage }: ICaravansData = await getCaravansData({
        page: 1,
        instantBookable,
        types: selectedTypes,
        minPrice,
        maxPrice
      })
      setCaravans([...data.items])
      setMoreResults(hasNextPage)
      setPage(1)
    } catch (error) {
      console.error(error)
      setCaravans([])
      setError(true)
    } finally {
      setDataLoading(false)
    }
  }, [instantBookable, selectedTypes, minPrice, maxPrice])

  const getNextPageData = useCallback(async () => {
    if (page <= 1) return

    try {
      setPageLoading(true)
      setError(false)
      const { data, hasNextPage }: ICaravansData = await getCaravansData({
        page,
        instantBookable,
        types: selectedTypes,
        minPrice,
        maxPrice
      })
      setCaravans((currentData: ICaravan[]) => [...currentData, ...data.items])
      setMoreResults(hasNextPage)
    } catch (error) {
      console.error(error)
      setCaravans([])
      setError(true)
    } finally {
      setPageLoading(false)
    }
  }, [instantBookable, selectedTypes, minPrice, maxPrice, page])

  useEffect(() => {
    getFilterData()
  }, [instantBookable, selectedTypes, minPrice, maxPrice, getFilterData])

  useEffect(() => {
    getNextPageData()
  }, [page, getNextPageData])

  return (
    <Context.Provider
      value={{
        caravans,
        setCaravans,
        instantBookable,
        setInstantBookable,
        selectedTypes,
        setSelectedTypes,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        setPage,
        isMoreResults,
        setMoreResults,
        isDataLoading,
        isPageLoading,
        isError
      }}
    >
      {children}
    </Context.Provider>
  )
}
