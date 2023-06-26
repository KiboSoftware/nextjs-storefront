/**
 * @module useUpdateSubscriptionShippingInfo
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateSubscriptionFulfillmentInfoMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SbFulfillmentInfoInput } from '@/lib/gql/types'

interface UpdateSubscriptionShippingInfoProps {
  subscriptionId: string
  fulfillmentInfoInput: SbFulfillmentInfoInput
}

const updateSubscriptionFulfillmentInfo = async (params: UpdateSubscriptionShippingInfoProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateSubscriptionFulfillmentInfoMutation,
    variables: params,
  })

  return response.subscription.fulfillmentInfo
}

/**
 * [Mutation hook] useUpdateSubscriptionShippingInfo uses the graphQL mutation
 *
 * <b>updateSubscriptionFulfillmentInfo(subscriptionId: String!, fulfillmentInfoInput: SbFulfillmentInfoInput ): SBFulfillmentInfo</b>
 *
 * Description : Updates Subscription Fulfillment Info
 *
 * Parameters passed to function updateSubscriptionFulfillmentInfo(props: UpdateSubscriptionShippingInfoProps) => expects object of type 'UpdateSubscriptionFulfillmentInfoProps' containing subscriptionId and fulfillmentInfoInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response.updateSubscriptionFulfillmentInfo', which returns updated Subscription FulfillmentInfo
 */
export const useUpdateSubscriptionShippingInfo = () => {
  const queryClient = useQueryClient()

  return {
    updateSubscriptionShippingInfo: useMutation({
      mutationFn: updateSubscriptionFulfillmentInfo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
      },
    }),
  }
}
