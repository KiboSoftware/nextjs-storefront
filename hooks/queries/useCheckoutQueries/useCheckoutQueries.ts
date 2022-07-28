import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Order } from '@/lib/gql/types'
interface UseCheckout {
  checkoutId?: string
  initialCheckout?: Order
}
export interface UseCheckoutResponse {
  data: Order | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCheckout = async (checkoutId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCheckoutQuery,
    variables: { checkoutId },
  })

  return response?.checkout
}

export const useCheckoutQueries = ({
  checkoutId,
  initialCheckout,
}: UseCheckout): UseCheckoutResponse => {
  const id = checkoutId as string

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutKeys.detail(id), () => getCheckout(checkoutId), {
    initialData: initialCheckout,
  })

  return { data, isLoading, isSuccess }
}
