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
const getAllShippingAddresses = (
  checkoutShippingContact: Contact,
  userShippingAddress: CustomerContact[] = []
) => {
  if (!userShippingAddress.length && checkoutShippingContact === null) {
    return []
  }

  const existingAddressId = userShippingAddress?.findIndex(
    (address) => address?.id === checkoutShippingContact?.id
  )

  if (existingAddressId < 0) {
    userShippingAddress?.unshift(checkoutShippingContact as CustomerContact)
  } else {
    userShippingAddress[existingAddressId] = {
      ...userShippingAddress[existingAddressId],
      ...(checkoutShippingContact as CustomerContact),
    }
  }
  return userShippingAddress
}

const getDefaultShippingAddress = (addresses: CustomerContact[]) =>
  addresses?.find(
    (each) =>
      each?.types &&
      each?.types?.some((type) => type?.name === AddressType.SHIPPING && type?.isPrimary)
  )

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
