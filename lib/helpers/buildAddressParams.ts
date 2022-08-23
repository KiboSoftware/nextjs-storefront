import type { AddressParams } from '../types'

export const buildAddressParams = (params: AddressParams) => {
  const { accountId, address, isDefaultAddress, addressType, action } = params

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
    contactId: address?.contact?.id as number,
  }

  return action === 'update' ? updateAddressParams : addressParams
}
