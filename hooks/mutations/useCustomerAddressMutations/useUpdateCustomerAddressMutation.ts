/**
 * @module useUpdateCustomerAddressMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactInput } from '@/lib/gql/types'
/**
 * @hidden
 */
export interface UpdateCustomerAccountContactDetailsParams {
  accountId: number
  contactId: number
  customerContactInput: CustomerContactInput
}

const updateCustomerAccountContactDetails = async (
  params: UpdateCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCustomerAccountContact,
    variables: params,
  })

  return response?.updateCustomerAccountContact
}

/**
 * [Mutation hook] useUpdateCustomerAddressMutation uses the graphQL mutation
 *
 * <b>updateCustomerAccountContact(accountId: Int!, contactId: Int!, userId: String, customerContactInput: CustomerContactInput): CustomerContact</b>
 *
 * Description : Update the existing customer's contact (address) saved into the account.
 *
 * Parameters passed to function updateCustomerAccountContactDetails(params: UpdateCustomerAccountContactDetailsParams) => expects object of type UpdateCustomerAccountContactDetailsParams containing accountId, contactId and customerContactInput.
 *
 * On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.
 *
 * @returns 'response?.updateCustomerAccountContact', which contains list of Customer's contact details.
 */

export const useUpdateCustomerAddressMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateSavedAddressDetails: useMutation(updateCustomerAccountContactDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountContactsKeys.all)
      },
    }),
  }
}
