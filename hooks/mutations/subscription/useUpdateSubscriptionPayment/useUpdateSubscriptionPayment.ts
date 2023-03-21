/**
 * @module useUpdateSubscriptionPaymentMutation
 */

import { useMutation, useQueryClient } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateSubscriptionPaymentMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SbPaymentInput } from '@/lib/gql/types'

interface UpdateSubscriptionPaymentProps {
  subscriptionId: string
  paymentInput: SbPaymentInput
}

const updateSubscriptionPayment = async (params: UpdateSubscriptionPaymentProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateSubscriptionPaymentMutation,
    variables: params,
  })

  return response.subscription
}

/**
 * [Mutation hook] useUpdateSubscriptionPaymentMutation uses the graphQL mutation
 *
 * <b>updateSubscriptionPayment(subscriptionId: String!  paymentInput: SbPaymentInput ): Subscription</b>
 *
 * Description : Updates Subscription Payment
 *
 * Parameters passed to function updateSubscriptionPayment(props: UpdateSubscriptionPaymentProps) => expects object of type 'UpdateSubscriptionPaymentProps' containing subscriptionId and paymentInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response.subscription', which returns updated Subscription
 */
export const useUpdateSubscriptionPaymentMutation = () => {
  const queryClient = useQueryClient()

  return {
    updateSubscriptionPaymentMutation: useMutation(updateSubscriptionPayment, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
