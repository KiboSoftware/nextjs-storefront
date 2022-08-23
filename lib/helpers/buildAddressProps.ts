import type { CrAddress, CuAddress } from '@/lib/gql/types'

export const buildAddressProps = (address: CuAddress | CrAddress) => {
  const { address1, address2, cityOrTown, stateOrProvince, postalOrZipCode } = address
  return {
    address1,
    address2,
    cityOrTown,
    stateOrProvince,
    postalOrZipCode,
  }
}
