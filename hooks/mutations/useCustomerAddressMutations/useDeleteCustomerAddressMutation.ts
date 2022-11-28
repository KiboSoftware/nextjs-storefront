import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

interface DeleteCustomerAccountContactDetailsParams {
  accountId: number
  contactId: number
}

const deleteCustomerAccountContactDetails = async (
  params: DeleteCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: deleteCustomerAccountContact,
    variables: params,
  })

  return response.deleteCustomerAccountContact
}

/**
 * [ Mutation hook => useDeleteCustomerAddressMutation calls the graphQL mutation
 *
 * deleteCustomerAccountContact(accountId: Int!, contactId: Int!): Boolean
 *
 * Description : Delete the customer's contact (address) saved on their account
 *
 * Parameters passed to function deleteCustomerAccountContactDetails(params: DeleteCustomerAccountContactDetailsParams) => expects object containing accountId and contactId to delete the address.
 *
 * On success, calls invalidateQueries all customerAccountContactsKeys and fetches the updated result.
 *
 * @returns 'response?.deleteCustomerAccountContact', that is True/False value to identify if customer's contact has been deleted or not.
 */

export const useDeleteCustomerAddressMutation = () => {
  const queryClient = useQueryClient()

  return {
    deleteSavedAddressDetails: useMutation(deleteCustomerAccountContactDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountContactsKeys.all)
      },
    }),
  }
}
