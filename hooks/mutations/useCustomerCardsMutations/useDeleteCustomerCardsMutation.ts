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

/**
 * [Mutation hook] useDeleteCustomerCardsMutation uses the graphQL mutation
 *
 * <b>deleteCustomerAccountCard(accountId: Int!, cardId: Int!): Boolean</b>
 *
 * Description : Delete the customer's card details saved on their account
 *
 * Parameters passed to function deleteCustomerAccountCardDetails(params: DeleteCustomerAccountCardDetailsParams) => expects object containing accountId and cardId to delete the card details.
 *
 * On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.
 *
 * @returns 'response?.deleteCustomerAccountCard', that is True/False value to identify if customer's card has been deleted or not.
 */

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
