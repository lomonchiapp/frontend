export * from './enums'
export * from './interfaces/user'
export * from './interfaces/client'
export * from './interfaces/sale'
export * from './interfaces/payment'
export * from './interfaces/account'
export * from './interfaces/city'
export * from './interfaces/dealer'
export * from './interfaces/history'
export * from './interfaces/invoice'
export * from './interfaces/vehicle'
export * from './interfaces/notification'
export * from './interfaces/application'

export interface Dealer {
  id: number
  name: string
  address: string
  lat: number
  lng: number
  phone?: string
  schedule?: string
}