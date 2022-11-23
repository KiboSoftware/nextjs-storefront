import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getMultiShipCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'
interface UseMultiShipCheckout {
  checkoutId?: string
  initialCheckout?: Checkout
}
export interface UseMultiShipCheckoutResponse {
  data: Checkout | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCheckout = async (checkoutId?: string | null) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getMultiShipCheckoutQuery,
    variables: { checkoutId },
  })

  return response?.checkout
}

const useCheckoutQueries = ({
  checkoutId,
  initialCheckout,
}: UseMultiShipCheckout): UseMultiShipCheckoutResponse => {
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

export const useMultiShipCheckoutQueries = useCheckoutQueries
