import { ICaravan } from './../../pages/api/interfaces/caravan.interface'
import { EInstantBookable } from '../enums/instant-bookable.enum'
import { EPricePicker } from '../enums/price-picker.enum'

import type { IResponseData, TVehicleType } from '../../pages/api/interfaces'

export interface ICaravansApiParameters {
  page: number
  instantBookable: EInstantBookable
  types: TVehicleType[]
  minPrice: number
  maxPrice: number
}

export interface ICaravansData {
  data: IResponseData
  hasNextPage: boolean
}

const ITEMS_PER_PAGE = 6

export const getCaravansData = async (params: ICaravansApiParameters): Promise<ICaravansData> => {
  const res = await fetch('http://localhost:3000/api/data')
  const data: IResponseData = await res.json()

  return getFilteredData(data, params)
}

const getFilteredData = (data: IResponseData, params: ICaravansApiParameters): ICaravansData => {
  if (params.instantBookable !== EInstantBookable.ALL) {
    data.items = filterBookable(data.items, params.instantBookable)
  }

  if (params.types.length) {
    data.items = filterTypes(data.items, params.types)
  }

  if (params.minPrice > EPricePicker.MIN_VALUE) {
    data.items = filterMinPrice(data.items, params.minPrice)
  }

  if (params.maxPrice > EPricePicker.MAX_VALUE) {
    data.items = filterMaxPrice(data.items, params.maxPrice)
  }

  const { items, hasNextPage } = filterByPage(data.items, params.page)
  data.items = items

  return { data, hasNextPage }
}

const filterBookable = (items: IResponseData['items'], bookable: EInstantBookable.NO | EInstantBookable.YES): IResponseData['items'] => {
  return items.filter((item: ICaravan): boolean => {
    if (bookable === EInstantBookable.NO) {
      return item.instantBookable === false
    }

    return item.instantBookable === true
  })
}

const filterTypes = (items: IResponseData['items'], types: TVehicleType[]): IResponseData['items'] => {
  return items.filter((item: ICaravan): boolean => {
    return types.includes(item.vehicleType)
  })
}

const filterMinPrice = (items: IResponseData['items'], minPrice: number): IResponseData['items'] => {
  return items.filter((item: ICaravan): boolean => {
    return item.price >= minPrice
  })
}

const filterMaxPrice = (items: IResponseData['items'], maxPrice: number): IResponseData['items'] => {
  return items.filter((item: ICaravan): boolean => {
    return item.price <= maxPrice
  })
}

const filterByPage = (items: IResponseData['items'], page: number): { items: IResponseData['items']; hasNextPage: boolean } => {
  const start: number = (page - 1) * ITEMS_PER_PAGE
  const end: number = page * ITEMS_PER_PAGE

  return { items: items.slice(start, end), hasNextPage: items.length >= end }
}
