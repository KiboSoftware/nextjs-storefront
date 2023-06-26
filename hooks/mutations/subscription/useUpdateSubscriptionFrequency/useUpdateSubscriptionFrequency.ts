/**
 * @module useUpdateSubscriptionFrequency
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { editSubscriptionFrequencyMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SbFrequencyInput } from '@/lib/gql/types'

interface EditSubscriptionFrequencyProps {
  subscriptionId: string
  frequencyInput: SbFrequencyInput
}

const editSubscriptionFrequency = async (params: EditSubscriptionFrequencyProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: editSubscriptionFrequencyMutation,
    variables: params,
  })

  return response.subscription.frequency
}

/**
 * [Mutation hook] useUpdateSubscriptionFrequency uses the graphQL mutation
 *
 * <b>updateSubscriptionFrequency(subscriptionId: String! frequencyInput: SBFrequencyInput): Subscription</b>
 *
 * Description : Updates Subscription Frequency
 *
 * Parameters passed to function editSubscriptionFrequency(props: EditSubscriptionFrequencyProps) => expects object of type 'EditSubscriptionFrequencyProps' containing subscriptionId and frequencyInput
 *
 * On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.
 *
 * @returns 'response.subscription.frequency', which returns updated Subscription Frequency
 */
export const useUpdateSubscriptionFrequency = () => {
  const queryClient = useQueryClient()

  return {
    updateSubscriptionFrequency: useMutation({
      mutationFn: editSubscriptionFrequency,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
      },
    }),
  }
}
