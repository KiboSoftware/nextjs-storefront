import { ContactForm } from './PaymentTypes'

export interface Window {
  pickupTime: { startsAt: number; endsAt?: number }
  dropoffTime: { startsAt: number; endsAt: number }
  readable: string
}

export interface InstantDelivery {
  contact?: ContactForm
  storeBoundary?: string[] | undefined | null
  window?:
    | {
        confirmedDate: string
        confirmedWindow: Window
        confirmedStoreId: string
      }
    | undefined
  notification?: { isSendSMS: boolean; isSendEmail: boolean }
}

interface DeliveryWindows {
  message: string
  data: Store[]
}

export interface Store {
  storeExternalId: string
  timeZone: string
  tags: string[]
  delivery: Delivery[]
}

export interface DropoffTime {
  startsAt: number
  endsAt: number
}
export interface DeliveryWindowsProps {
  pickupTime: {
    startsAt: number
  }
  dropoffTime: DropoffTime
  tz: string
  windowId: null | string
  provider: null | string
}

export interface Delivery {
  category: string
  pickAndPack: number
  date: string
  windows: DeliveryWindowsProps[]
}

export type DeliveryDateAndWindow =
  | {
      confirmedDate: string
      confirmedWindow: Window
      confirmedStoreId: string
    }
  | undefined

export interface Notification {
  isSendSMS: boolean
  isSendEmail: boolean
}
