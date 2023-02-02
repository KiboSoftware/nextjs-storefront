/**
 * @module usePerformSubscriptionActionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { performSubscriptionActionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import { SubscriptionActionInput } from '@/lib/gql/types'

interface performSubscriptionActionProps {
  subscriptionId: string
  subscriptionActionInput: SubscriptionActionInput
}

const performSubscriptionAction = async (params: performSubscriptionActionProps) => {
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
 * <b>performSubscriptionAction(subscriptionId: string): Subscription</b>
 *
 * Description : Pause subscription order according to the frequency unit and value.
 *
 * Parameters passed to function performSubscriptionAction(subscriptionId?: string | null) => expects subscriptionId
 *
 * @returns 'response?.subscription' which contains next order date when the order will be placed
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
