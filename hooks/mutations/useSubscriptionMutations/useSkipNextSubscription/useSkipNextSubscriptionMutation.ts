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

  return response.skipNextSubscription
}

export const useSkipNextSubscriptionMutation = () => {
  const queryClient = useQueryClient()

  return useMutation(skipNextSubscription, {
    onSuccess: () => {
      queryClient.invalidateQueries(subscriptionKeys.all)
    },
  })
}
