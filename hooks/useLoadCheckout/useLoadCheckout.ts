import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

import { orderMock } from '../../__mocks__/stories/orderMock'
import { querykeys } from '../../lib/react-query/queryKeys'
import { getCheckoutQuery, getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'

import type { Order } from '@/lib/gql/types'
export interface UseLoadCheckout {
  data: Order | undefined
  isLoading: boolean
  isSuccess: boolean
}
export interface UseLoadFromCart {
  data: Order | never[]
  isLoading: boolean
  isSuccess: boolean
}

const getOrCreateCheckout = async (checkoutId?: string | null, cartId?: string | null) => {
  let response

  if (checkoutId) {
    response = await request({
      url: '/api/graphql',
      document: getCheckoutQuery,
      variables: { checkoutId },
    })
  }

  if (cartId) {
    response = await request({
      url: '/api/graphql',
      document: getOrCreateCheckoutFromCartMutation,
      variables: { cartId },
    })

    console.log(`${checkoutId ? 'checkoutId' : 'cartId'} response: ${JSON.stringify(response)}`)
    return response?.data?.checkout
  }
}

export const useLoadCheckout = (checkoutId: string): UseLoadCheckout => {
  const { data, isLoading, isSuccess } = useQuery([querykeys.LOAD_CHECKOUT, checkoutId], () =>
    getOrCreateCheckout(checkoutId, null)
  )
  return { data, isLoading, isSuccess }
}

export const useLoadFromCart = (cartId: string): UseLoadFromCart => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery([querykeys.LOAD_FROM_CART, cartId], () => getOrCreateCheckout(null, cartId))

  return { data, isLoading, isSuccess }
}
