/**
 * @module useDeleteSubscriptionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { deleteSubscriptionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SubscriptionReasonInput } from '@/lib/gql/types'

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
 * <b>deleteSubscription(subscriptionId: string, subscriptionItemId: string, subscriptionReasonInput: SubscriptionReasonInput): Subscription</b>
 *
 * Description : Delete subscription order according to the actionName.
 *
 * Parameters passed to function deleteSubscription(props: DeleteSubscriptionProps) => expects object of type 'DeleteSubscriptionProps' containing subscriptionId, subscriptionItemId and subscriptionReasonInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response?.subscription' which contains object of Subscription
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
