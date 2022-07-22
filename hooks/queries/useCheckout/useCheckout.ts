import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutQuery, getOrCreateCheckoutFromCartMutation } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Order } from '@/lib/gql/types'
interface UseCheckout {
  cartId?: string
  checkoutId?: string
  initialCheckout?: Order
}
export interface UseCheckoutResponse {
  data: Order | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getOrCreateCheckout = async (cartId?: string | null, checkoutId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: checkoutId ? getCheckoutQuery : getOrCreateCheckoutFromCartMutation,
    variables: checkoutId ? { checkoutId } : { cartId },
  })

  return response?.checkout
}

export const useCheckout = ({
  cartId,
  checkoutId,
  initialCheckout,
}: UseCheckout): UseCheckoutResponse => {
  const id = (cartId ? cartId : checkoutId) as string

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutKeys.detail(id), () => getOrCreateCheckout(cartId, checkoutId), {
    initialData: initialCheckout,
  })

  return { data, isLoading, isSuccess }
}
