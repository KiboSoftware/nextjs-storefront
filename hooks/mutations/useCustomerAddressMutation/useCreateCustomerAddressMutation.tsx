import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCustomerAccountContact } from '@/lib/gql/mutations'
import { customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import type { CustomerContactInput } from '@/lib/gql/types'

interface CreateCustomerAccountContactDetailsParams {
  accountId: number
  customerContactInput: CustomerContactInput
}

const addCustomerAccountContactDetails = async (
  params: CreateCustomerAccountContactDetailsParams
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCustomerAccountContact,
    variables: params,
  })

  return response?.createCustomerAccountContact
}

export const useCreateCustomerAddressMutation = () => {
  const queryClient = useQueryClient()

  return {
    addSavedAddressDetails: useMutation(addCustomerAccountContactDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountContactsKeys.all)
      },
    }),
  }
}
