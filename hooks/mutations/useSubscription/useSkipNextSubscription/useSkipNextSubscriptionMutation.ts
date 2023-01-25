/**
 * @module useSkipNextSubscriptionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { skipNextSubscriptionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

const skipNextSubscription = async (subscriptionId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: skipNextSubscriptionMutation,
    variables: { subscriptionId },
  })

  return response?.subscription
}

/**
 * [Mutation hook] useSkipNextSubscriptionMutation uses the graphQL mutation
 *
 * <b>skipNextSubscription(subscriptionId: string): Subscription</b>
 *
 * Description : Skip the next subscription order according to the frequency unit and value.
 *
 * Parameters passed to function skipNextSubscription(subscriptionId?: string | null) => expects subscriptionId
 *
 * @returns 'response?.subscription' which contains next order date when the order will be placed
 */
export const useSkipNextSubscriptionMutation = () => {
  const queryClient = useQueryClient()

  return {
    skipNextSubscription: useMutation(skipNextSubscription, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
