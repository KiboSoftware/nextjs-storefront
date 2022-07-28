import type { Hours, CrAddress } from '@/lib/gql/types'

export type HoursCustom = {
  day?: string | Hours
  storeTime?: string
}
export type LocationCustom = {
  code?: string
  name?: string
  phone?: string
  address1?: string
  address2?: string
  streetAddress?: string
  cityState?: string
  city?: string
  state?: string
  zip?: string
  hours?: HoursCustom[] | null
  fullAddress?: CrAddress
}
