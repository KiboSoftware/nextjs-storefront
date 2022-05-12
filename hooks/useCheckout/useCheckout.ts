import { request } from 'graphql-request'
import { useQuery } from 'react-query'

import { querykeys } from '../../lib/react-query/queryKeys'
import { getCheckoutQuery, getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'

import type { Order } from '@/lib/gql/types'
interface UseCheckout {
  cartId?: string
  checkoutId?: string
}
export interface UseCheckoutResponse {
  data: Order | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getOrCreateCheckout = async (cartId?: string | null, checkoutId?: string | null) => {
  const response = await request({
    url: '/api/graphql',
    document: checkoutId ? getCheckoutQuery : getOrCreateCheckoutFromCartMutation,
    variables: checkoutId ? { checkoutId } : { cartId },
  })

  return response?.checkout
}

export const useCheckout = ({ cartId, checkoutId }: UseCheckout): UseCheckoutResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery([querykeys.LOAD_CHECKOUT, cartId], () => getOrCreateCheckout(cartId, checkoutId))

  return { data, isLoading, isSuccess }
}
