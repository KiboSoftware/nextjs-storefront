import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactInput } from '@/lib/gql/types'

interface UpdateCustomerAccountContactDetailsParams {
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
