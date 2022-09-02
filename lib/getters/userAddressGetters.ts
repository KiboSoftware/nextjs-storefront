import { CustomerContact } from '../gql/types'
import { AddressType } from '@/lib/constants'

const getAddresses = (addresses: CustomerContact[], addressType: string) => {
  return addresses
    ?.filter(
      (item: CustomerContact | any) =>
        item?.types[0]?.name?.toLowerCase() === addressType.toLowerCase()
    )
    ?.sort((a: any, b: any) => b?.types[0]?.isPrimary - a?.types[0]?.isPrimary)
}

const getUserShippingAddress = (addresses: CustomerContact[] | any) => {
  if (addresses?.length) return getAddresses(addresses, AddressType.SHIPPING)
}
const getUserBillingAddresses = (addresses: CustomerContact[] | any) => {
  if (addresses?.length) if (addresses?.length) return getAddresses(addresses, AddressType.BILLING)
}

export const userAddressGetters = {
  getUserShippingAddress,
  getUserBillingAddresses,
}
