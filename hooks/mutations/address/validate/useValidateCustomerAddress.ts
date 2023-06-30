/**
 * @module useValidateCustomerAddress
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { validateCustomerAddress } from '@/lib/gql/mutations'
import { addressKeys, checkoutKeys, customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { AddressValidationRequestInput } from '@/lib/gql/types'
/**
 * @hidden
 */
export interface ValidateCustomerAddressParams {
  addressValidationRequestInput: AddressValidationRequestInput
}

const validateCustomerAddressDetails = async (params: ValidateCustomerAddressParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: validateCustomerAddress,
    variables: params,
  })

  return response?.validateCustomerAddress?.addressCandidates
}

/**
 * [Mutation hook] useValidateCustomerAddress uses the graphQL mutation
 *
 * <b>validateCustomerAddress(addressValidationRequestInput: AddressValidationRequestInput): CustomerContact</b>
 *
 * Description : Validate the customer's address.
 *
 * Parameters passed to function validateCustomerAddressDetails(params: ValidateCustomerAddressParams) => expects object of type ValidateCustomerAddressParams containing addressValidationRequestInput.
 *
 * On success, calls invalidateQueries all addressKeys and fetches the updated result.
 *
 * @returns 'response?.addressCandidates', which contains validated Customer's contact details.
 */

export const useValidateCustomerAddress = () => {
  const queryClient = useQueryClient()

  return {
    validateCustomerAddress: useMutation({
      mutationFn: validateCustomerAddressDetails,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: addressKeys.all })
        queryClient.invalidateQueries({ queryKey: checkoutKeys.all })
        queryClient.invalidateQueries({ queryKey: customerAccountContactsKeys.all })
      },
    }),
  }
}
