import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getOrdersQuery } from '@/lib/gql/queries'
import { buildOrdersFilterInput } from '@/lib/helpers'
import { ordersKeys } from '@/lib/react-query/queryKeys'

import type { OrderCollection } from '@/lib/gql/types'

interface UseUserOrder {
  orderNumber?: string
  billingEmail?: string
  filters?: string | string[]
}

export interface UseUserOrderType {
  data: OrderCollection
  isLoading: boolean
  isSuccess: boolean
}

const getOrders = async (variables: { filter: string; startIndex: number; pageSize: number }) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getOrdersQuery,
    variables: variables,
  })

  return response?.orders
}

export const useUserOrderQueries = (param: UseUserOrder): UseUserOrderType => {
  const { orderNumber, billingEmail, filters } = param
  const variables = buildOrdersFilterInput({
    filters,
    orderNumber,
    billingEmail,
  })

  const {
    data = {},
    isLoading,
    isSuccess,
  } = useQuery(ordersKeys.all, () => getOrders(variables), {
    enabled: !!(filters?.length || (orderNumber && billingEmail)),
    retry: 3,
  })

  return { data, isLoading, isSuccess }
}
