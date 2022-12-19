/**
 * @module useUserOrderQueries
 */
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

/**
 * @hidden
 */
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

/**
 * [Query hook] useUserOrderQueries uses the graphQL query
 *
 * <b>orders(startIndex: Int, pageSize: Int, sortBy: String, filter: String): OrderCollection</b>
 *
 * Description : Fetches the orders based on filter provided and non abandoned orders.
 *
 * Parameters passed to function getOrders(params: UseUserOrder) => expects UseUserOrder containing filters or order number and billing email.
 *
 * On success, returns the list of orders
 *
 * @param param Accepts a UseUserOrder value as filters (duration like M-1, M-6, Y-2022 etc) or order number and billing email including status (ABANDONED)
 *
 * @returns 'response?.orders', which contains orders list.
 */

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
