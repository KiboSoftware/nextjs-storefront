import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getShippingRates } from '@/lib/gql/queries'
import { shippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { ShippingRate } from '@/lib/gql/types'

export interface UseShippingMethodsResponse {
  data: ShippingRate[]
  isLoading: boolean
  isSuccess: boolean
}

const loadShippingMethods = async (checkoutId: string) => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getShippingRates,
    variables: { checkoutId },
  })

  return response?.orderShipmentMethods
}

export const useShippingMethods = (
  checkoutId: string | null | undefined
): UseShippingMethodsResponse => {
  const { data = [], isLoading, isSuccess } = useQuery(
    shippingMethodKeys.detail(checkoutId as string),
    () => loadShippingMethods(checkoutId as string),
    {
      cacheTime: 0,
      enabled: !!checkoutId,
    }
  )

  return { data, isLoading, isSuccess }
}
