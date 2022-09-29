import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteCustomerAccountCard } from '@/lib/gql/mutations'
import { customerAccountCardsKeys } from '@/lib/react-query/queryKeys'

interface DeleteCustomerAccountCardDetailsParams {
  accountId: number
  cardId: string
}

const deleteCustomerAccountCardDetails = async (params: DeleteCustomerAccountCardDetailsParams) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: deleteCustomerAccountCard,
    variables: params,
  })

  return response.deleteCustomerAccountCard
}

export const useDeleteCustomerCardsMutation = () => {
  const queryClient = useQueryClient()

  return {
    deleteSavedCardDetails: useMutation(deleteCustomerAccountCardDetails, {
      onSuccess: () => {
        queryClient.invalidateQueries(customerAccountCardsKeys.all)
      },
    }),
  }
}
