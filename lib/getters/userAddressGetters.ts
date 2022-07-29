import { CustomerContact } from '../gql/types'

const getUserShippingAddress = (addresses: CustomerContact[] | any) => {
  if (addresses?.length)
    return addresses
      ?.filter((item: CustomerContact | any) => item?.types[0]?.name?.toLowerCase() === 'shipping')
      ?.sort((a: any, b: any) => b?.types[0]?.isPrimary - a?.types[0]?.isPrimary)
}

export const userAddressGetters = {
  getUserShippingAddress,
}
