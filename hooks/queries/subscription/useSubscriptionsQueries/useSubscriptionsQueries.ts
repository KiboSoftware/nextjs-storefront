import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getSubscriptionsQuery } from '@/lib/gql/queries'
import { subscriptionKeys } from '@/lib/react-query/queryKeys'

import type { SubscriptionCollection } from '@/lib/gql/types'

export interface SubscriptionType {
  data: SubscriptionCollection
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getSubscriptions = async () => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getSubscriptionsQuery,
    variables: {},
  })

  return response?.subscriptions
}

export const useSubscriptionsQueries = (): SubscriptionType => {
  const {
    data = {},
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(subscriptionKeys.all, getSubscriptions, {
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess, isFetching }
}
