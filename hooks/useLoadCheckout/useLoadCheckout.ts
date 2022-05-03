import { useQuery } from 'react-query'

import { mockCheckout } from '../../__mocks__/msw/mockData'
import { querykeys } from '../../react-query/queryKeys'

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
  if (checkoutId) return mockCheckout
  if (cartId) return mockCheckout
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
