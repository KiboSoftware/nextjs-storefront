/**
 * @module useDeleteCustomerCard
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

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

/**
 * [Mutation hook] useDeleteCustomerCard uses the graphQL mutation
 *
 * <b>deleteCustomerAccountCard(accountId: Int!, cardId: Int!): Boolean</b>
 *
 * Description : Delete the customer's card details saved on their account
 *
 * Parameters passed to internal function deleteCustomerAccountCardDetails(params: DeleteCustomerAccountCardDetailsParams) => expects object of type DeleteCustomerAccountCardDetailsParams containing accountId and cardId.
 *
 * On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.
 *
 * @returns 'response?.deleteCustomerAccountCard', which contains True/False value to identify if customer's card has been deleted or not.
 */

export const useDeleteCustomerCard = () => {
  const queryClient = useQueryClient()

  return {
    deleteCustomerCard: useMutation({
      mutationFn: deleteCustomerAccountCardDetails,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: customerAccountCardsKeys.all })
      },
    }),
  }
}
