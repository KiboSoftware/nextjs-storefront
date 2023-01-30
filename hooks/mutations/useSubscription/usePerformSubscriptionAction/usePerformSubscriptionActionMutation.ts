/**
 * @module usePerformSubscriptionActionMutation
 */
import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { performSubscriptionActionMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

interface performSubscriptionActionProps {
  subscriptionId: string
  subscriptionActionInput: SubscriptionActionInput
}
interface SubscriptionActionInput {
  actionName: string
  reason?: SubscriptionReasonInput
}

interface SubscriptionReasonInput {
  actionName: string
}

const performSubscriptionAction = async (params: performSubscriptionActionProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: performSubscriptionActionMutation,
    variables: params,
  })
  console.log('response', response)
  return response?.subscription
}

/**
 * [Mutation hook] usePauseSubscriptionMutation uses the graphQL mutation
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
    performSubscriptionAction: useMutation(performSubscriptionAction, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
