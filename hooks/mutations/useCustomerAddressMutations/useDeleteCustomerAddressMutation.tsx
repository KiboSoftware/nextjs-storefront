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
