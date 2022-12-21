import { useMutation, useQueryClient } from 'react-query'

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

export const useOrderSubscriptionNowMutation = () => {
  const queryClient = useQueryClient()
  return {
    orderSubscriptionNow: useMutation(orderSubscriptionNowMutation, {
      onSuccess: () => {
        queryClient.invalidateQueries(subscriptionKeys.all)
      },
    }),
  }
}
