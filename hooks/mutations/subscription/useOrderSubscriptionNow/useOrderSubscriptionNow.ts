/**
 * @module useOrderSubscriptionNow
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { orderSubscriptionNow } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

interface OrderSubscriptionNowInputParams {
  subscriptionId: string
}

const orderSubscriptionNowMutation = async (props: OrderSubscriptionNowInputParams) => {
  const client = makeGraphQLClient()
  const { subscriptionId } = props

  const variables = {
    subscriptionId,
  }

  const response = await client.request({
    document: orderSubscriptionNow,
    variables,
  })

  return response?.orderSubscriptionNow
}

/**
 * [Mutation hook] useOrderSubscriptionNow uses the graphQL mutation
 *
 * <b>orderSubscriptionNow(subscriptionId: String! ): Subscription</b>
 *
 * Description : Order a subscription for a product
 *
 * Parameters passed to function orderSubscriptionNowMutation(props: OrderSubscriptionNowInputParams) => expects object of type 'OrderSubscriptionNowInputParams' containing subscriptionId
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response?.orderSubscriptionNow' which contains object of Subscription
 */
export const useOrderSubscriptionNow = () => {
  const queryClient = useQueryClient()
  return {
    orderSubscriptionNow: useMutation({
      mutationFn: orderSubscriptionNowMutation,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
      },
    }),
  }
}
