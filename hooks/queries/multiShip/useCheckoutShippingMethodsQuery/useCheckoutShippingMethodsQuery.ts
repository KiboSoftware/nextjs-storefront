import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutShippingMethodsQuery } from '@/lib/gql/queries'
import { shippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { CheckoutGroupRates } from '@/lib/gql/types'

export interface UseCheckoutShippingMethodsResponse {
  data: CheckoutGroupRates[]
  isLoading: boolean
  isSuccess: boolean
}

const loadShippingMethods = async (checkoutId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCheckoutShippingMethodsQuery,
    variables: { checkoutId },
  })
  return response?.checkoutShippingMethods
}

export const useCheckoutShippingMethodsQuery = (
  checkoutId: string | null | undefined,
  selectedShippingAddressId?: string | null
): UseCheckoutShippingMethodsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    shippingMethodKeys.detail(checkoutId as string, selectedShippingAddressId as string),
    () => loadShippingMethods(checkoutId as string),
    {
      cacheTime: 0,
      enabled: !!(checkoutId && selectedShippingAddressId),
    }
  )

  return { data, isLoading, isSuccess }
}
