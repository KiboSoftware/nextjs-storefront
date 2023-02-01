/**
 * @module useSkipNextSubscriptionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteSubscriptionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import { SubscriptionReasonInput } from '@/lib/gql/types'

interface DeleteSubscriptionProps {
  subscriptionId: string
  subscriptionItemId: string
  subscriptionReasonInput: SubscriptionReasonInput
}

const deleteSubscription = async (params: DeleteSubscriptionProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: deleteSubscriptionMutation,
    variables: params,
  })

  return response?.subscription
}

/**
 * [Mutation hook] useDeleteSubscriptionMutation uses the graphQL mutation
 *
 * <b>deleteSubscription(subscriptionId: string): Subscription</b>
 *
 * Description : Delete subscription order according to the actionName.
 *
 * Parameters passed to function skipNextSubscription(subscriptionId?: string | null) => expects subscriptionId
 *
 * @returns 'response?.subscription' which contains next order date when the order will be placed
 */
export const useDeleteSubscriptionMutation = () => {
  const queryClient = useQueryClient()

  return {
    deleteSubscription: useMutation(deleteSubscription, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
