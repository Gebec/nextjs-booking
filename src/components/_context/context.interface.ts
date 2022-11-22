import { Dispatch, SetStateAction } from 'react'
import { EInstantBookable } from '../../enums/instant-bookable.enum'

import type { TVehicleType, ICaravan } from '../../../pages/api/interfaces'

export interface IContext {
  caravans: ICaravan[]
  setCaravans: Dispatch<SetStateAction<ICaravan[]>>
  instantBookable: EInstantBookable
  setInstantBookable: React.Dispatch<SetStateAction<EInstantBookable>>
  selectedTypes: TVehicleType[]
  setSelectedTypes: Dispatch<SetStateAction<TVehicleType[]>>
  minPrice: number
  setMinPrice: Dispatch<SetStateAction<number>>
  maxPrice: number
  setMaxPrice: Dispatch<SetStateAction<number>>
  setPage: Dispatch<SetStateAction<number>>
  isMoreResults: boolean
  setMoreResults: Dispatch<SetStateAction<boolean>>
  isDataLoading: boolean
  isPageLoading: boolean
  isError: boolean
}
