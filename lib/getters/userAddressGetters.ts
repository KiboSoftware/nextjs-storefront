import { CustomerContact, Contact } from '../gql/types'
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
const getAllShippingAddresses = (contactProp: Contact, userShippingAddress: CustomerContact[]) => {
  const existingAddressId = userShippingAddress.findIndex(
    (address) => address.id === contactProp.id
  )

  if (existingAddressId < 0) {
    userShippingAddress.unshift(contactProp as CustomerContact)
  } else {
    userShippingAddress[existingAddressId] = {
      ...userShippingAddress[existingAddressId],
      ...(contactProp as CustomerContact),
    }
  }
  return userShippingAddress
}

const getDefaultShippingAddress = (addresses: CustomerContact[]) =>
  addresses?.find((each) => each?.types && each?.types[0]?.isPrimary)

const getOtherShippingAddress = (
  addresses: CustomerContact[],
  defaultShippingAddressId: number
) => {
  return (
    Array.from(new Set(addresses?.filter((each) => each?.id != defaultShippingAddressId))) || []
  )
}

export const userAddressGetters = {
  getUserShippingAddress,
  getUserBillingAddresses,
  getAllShippingAddresses,
  getDefaultShippingAddress,
  getOtherShippingAddress,
}
