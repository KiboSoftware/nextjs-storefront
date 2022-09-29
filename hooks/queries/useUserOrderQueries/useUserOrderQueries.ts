import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOrdersQuery } from '@/lib/gql/queries'
import { buildOrdersFilterParams } from '@/lib/helpers'
import { ordersKeys } from '@/lib/react-query/queryKeys'

import type { OrderCollection } from '@/lib/gql/types'

interface UseUserOrder {
  orderNumber?: string
  billingEmail?: string
  filters?: string | string[]
  isRefetching: boolean
}

export interface UseUserOrderType {
  data: OrderCollection
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getOrders = async (params: UseUserOrder) => {
  const client = makeGraphQLClient()
  const variables = buildOrdersFilterParams(params)

  const response = await client.request({
    document: getOrdersQuery,
    variables: variables,
  })

  return response?.orders
}

export const useUserOrderQueries = (param: UseUserOrder): UseUserOrderType => {
  const {
    data = {},
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    ordersKeys.all,
    () => {
      if (param.orderNumber === '' && param.billingEmail === '') return []
      return getOrders(param)
    },
    {
      enabled: param?.isRefetching,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
