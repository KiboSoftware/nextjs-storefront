import { QueryClient, useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import {
  createCustomerAccountCard,
  deleteCustomerAccountCard,
  updateCustomerAccountCard,
} from '@/lib/gql/mutations'
import { customerAccountCardsKeys, customerAccountContactsKeys } from '@/lib/react-query/queryKeys'

import { CardInput } from '@/lib/gql/types'

interface DeleteCustomerAccountCardDetailsParams {
  accountId: number
  cardId: string
}

interface AddCustomerAccountCardDetailsParams {
  accountId: number
  cardInput: CardInput
}

interface UpdateCustomerAccountCardDetailsParams
  extends DeleteCustomerAccountCardDetailsParams,
    AddCustomerAccountCardDetailsParams {
  cardId: string
}

const refetch = (queryClient: QueryClient) => {
  queryClient.invalidateQueries(customerAccountCardsKeys.all)
  queryClient.invalidateQueries(customerAccountContactsKeys.all)
}

const updateCustomerAccountCardDetails = async (params: UpdateCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  await client.request({
    document: updateCustomerAccountCard,
    variables: params,
  })
}

const addCustomerAccountCardDetails = async (params: AddCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  await client.request({
    document: createCustomerAccountCard,
    variables: params,
  })
}

const deleteCustomerAccountCardDetails = async (params: DeleteCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  await client.request({
    document: deleteCustomerAccountCard,
    variables: params,
  })
}

export const useCustomerCardsMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateSavedCardDetails: useMutation(updateCustomerAccountCardDetails, {
      onSuccess: () => {
        refetch(queryClient)
      },
    }),
    addSavedCardDetails: useMutation(addCustomerAccountCardDetails, {
      onSuccess: () => {
        refetch(queryClient)
      },
    }),
    deleteSavedCardDetails: useMutation(deleteCustomerAccountCardDetails, {
      onSuccess: () => {
        refetch(queryClient)
      },
    }),
  }
}
