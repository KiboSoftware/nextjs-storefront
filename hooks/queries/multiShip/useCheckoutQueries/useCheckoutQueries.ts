import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getMultiShipCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'
interface UseMultiShipCheckout {
  checkoutId: string
  isMultiship?: boolean
  initialCheckout?: Checkout
}
export interface UseMultiShipCheckoutResponse {
  data: Checkout | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCheckout = async (checkoutId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getMultiShipCheckoutQuery,
    variables: { checkoutId },
  })

  return response?.checkout
}

const useCheckoutQueries = ({
  checkoutId,
  isMultiship,
  initialCheckout,
}: UseMultiShipCheckout): UseMultiShipCheckoutResponse => {
  const id = checkoutId

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutKeys.detail(id), () => getCheckout(checkoutId), {
    initialData: initialCheckout,
    enabled: !!isMultiship,
  })

  return { data, isLoading, isSuccess }
}

export const useMultiShipCheckoutQueries = useCheckoutQueries
