import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { createCustomerAccountCard } from '@/lib/gql/mutations'
import { customerAccountCardsKeys } from '@/lib/react-query/queryKeys'

import type { CardInput } from '@/lib/gql/types'

interface AddCustomerAccountCardDetailsParams {
  accountId: number
  cardInput: CardInput
}

const addCustomerAccountCardDetails = async (params: AddCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: createCustomerAccountCard,
    variables: params,
  })

  return response.createCustomerAccountCard
}

export const useCreateCustomerCardsMutation = () => {
  const queryClient = useQueryClient()

  return {
    addSavedCardDetails: useMutation(addCustomerAccountCardDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountCardsKeys.all)
      },
    }),
  }
}
