import type { AddressParams } from '../types'

export const buildAddressParams = (params: AddressParams) => {
  const { accountId, address, isDefaultAddress, addressType } = params
  const contactId = address?.contact?.id as number

  const addressParams = {
    accountId: accountId,
    customerContactInput: {
      ...address?.contact,
      types: [
        {
          name: addressType,
          isPrimary: isDefaultAddress,
        },
      ],
      accountId: accountId,
    },
  }

  const updateAddressParams = {
    ...addressParams,
    contactId,
  }

  return contactId ? updateAddressParams : addressParams
}
