/**
 * @module usePerformSubscriptionActionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { performSubscriptionActionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SubscriptionActionInput } from '@/lib/gql/types'

interface PerformSubscriptionActionProps {
  subscriptionId: string
  subscriptionActionInput: SubscriptionActionInput
}

const performSubscriptionAction = async (params: PerformSubscriptionActionProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: performSubscriptionActionMutation,
    variables: params,
  })
  return response?.subscription
}
/**
 * [Mutation hook] usePerformSubscriptionActionMutation uses the graphQL mutation
 *
 * <b>performSubscriptionAction(subscriptionId: string subscriptionActionInput: SubscriptionActionInput): Subscription</b>
 *
 * Description : Pause subscription order according to the actionName.
 *
 * Parameters passed to function performSubscriptionAction(props: PerformSubscriptionActionProps) => expects object of type 'PerformSubscriptionActionProps' containing subscriptionId and SubscriptionActionInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response?.subscription' which contains object of Subscription
 */
export const usePerformSubscriptionActionMutation = () => {
  const queryClient = useQueryClient()

  return {
    performSubscriptionActionMutation: useMutation(performSubscriptionAction, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
