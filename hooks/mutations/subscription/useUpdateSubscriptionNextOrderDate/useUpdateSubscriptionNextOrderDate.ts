/**
 * @module useUpdateSubscriptionNextOrderDate
 */
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { updateSubscriptionNextOrderDateMutation } from '@/lib/gql/mutations'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

interface UpdateSubscriptionNextOrderDateProps {
  subscriptionId: string
  subscriptionNextOrderDateInput: {
    nextOrderDate: string
  }
}

const updateSubscriptionNextOrderDate = async (params: UpdateSubscriptionNextOrderDateProps) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: updateSubscriptionNextOrderDateMutation,
    variables: params,
  })

  return response?.subscription.nextOrderDate
}

/**
 * [Mutation hook] useUpdateSubscriptionNextOrderDate uses the graphQL mutation
 *
 * <b>updateSubscriptionNextOrderDate(subscriptionId: String!, subscriptionNextOrderDateInput: SubscriptionNextOrderDateInput): Subscription</b>
 *
 * Description : Update subscription next order date.
 *
 * Parameters passed to function updateSubscriptionNextOrderDate(subscriptionId: string, subscriptionNextOrderDateInput: { nextOrderDate: string  }) => expects subscriptionId and nextOrderDate
 *
 * @returns 'response?.subscription.nextOrderDate' which contains next order date when the order will be placed
 */
export const useUpdateSubscriptionNextOrderDate = () => {
  const queryClient = useQueryClient()

  return {
    updateSubscriptionNextOrderDate: useMutation({
      mutationFn: updateSubscriptionNextOrderDate,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: subscriptionKeys.all })
      },
    }),
  }
}
