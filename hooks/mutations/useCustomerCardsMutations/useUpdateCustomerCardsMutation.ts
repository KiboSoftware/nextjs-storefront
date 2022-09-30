import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateCustomerAccountCard } from '@/lib/gql/mutations'
import { customerAccountCardsKeys } from '@/lib/react-query/queryKeys'

import type { CardInput } from '@/lib/gql/types'

interface UpdateCustomerAccountCardDetailsParams {
  cardId: string
  accountId: number
  cardInput: CardInput
}

const updateCustomerAccountCardDetails = async (params: UpdateCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateCustomerAccountCard,
    variables: params,
  })

  return response.updateCustomerAccountCard
}

export const useUpdateCustomerCardsMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateSavedCardDetails: useMutation(updateCustomerAccountCardDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountCardsKeys.all)
      },
    }),
  }
}
