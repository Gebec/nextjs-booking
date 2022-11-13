import { TVehicleType } from './vehicle-type.type'

export interface ICaravan {
  location: string
  instantBookable: boolean
  name: string
  passengersCapacity: number
  sleepCapacity: number
  price: number
  toilet: boolean
  shower: boolean
  vehicleType: TVehicleType
  pictures: string[]
}
