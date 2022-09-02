import type { Address } from '@/lib/types'

export interface AddressParams {
  accountId: number
  address: Address
  isDefaultAddress: boolean
  addressType: string
}

export interface DeleteAddressParams {
  accountId: number
  contactId: number
}
