/**
 * @module updateSubscriptionFulfillmentInfo
 */

import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateSubscriptionFulfillmentInfoMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SbFulfillmentInfoInput } from '@/lib/gql/types'

interface UpdateSubscriptionFulfillmentInfoProps {
  subscriptionId: string
  fulfillmentInfoInput: SbFulfillmentInfoInput
}

const updateSubscriptionFulfillmentInfo = async (
  params: UpdateSubscriptionFulfillmentInfoProps
) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateSubscriptionFulfillmentInfoMutation,
    variables: params,
  })

  return response.subscription.fulfillmentInfo
}

/**
 * [Mutation hook] updateSubscriptionFulfillmentInfo uses the graphQL mutation
 *
 * <b>updateSubscriptionFulfillmentInfo(subscriptionId: String!, fulfillmentInfoInput: SbFulfillmentInfoInput ): SBFulfillmentInfo</b>
 *
 * Description : Updates Subscription Fulfillment Info
 *
 * Parameters passed to function updateSubscriptionFulfillmentInfo(props: UpdateSubscriptionFulfillmentInfoProps) => expects object of type 'UpdateSubscriptionFulfillmentInfoProps' containing subscriptionId and fulfillmentInfoInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response.updateSubscriptionFulfillmentInfo', which returns updated Subscription FulfillmentInfo
 */
export const useUpdateSubscriptionFulfillmentInfoMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateSubscriptionFulfillmentInfoMutation: useMutation(updateSubscriptionFulfillmentInfo, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
