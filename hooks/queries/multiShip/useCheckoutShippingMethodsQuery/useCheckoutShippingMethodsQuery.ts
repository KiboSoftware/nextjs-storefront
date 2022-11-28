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
  console.log('###useCheckoutShippingMethodsQuery##', response)
  return response?.checkoutShippingMethods
}

export const useCheckoutShippingMethodsQuery = (
  checkoutId: string | null | undefined,
  isNewAddressAdded?: boolean,
  selectedShippingAddressId?: number | undefined | null
): UseCheckoutShippingMethodsResponse => {
  console.log(
    '##checkoutId',
    checkoutId,
    '###isNewAddressAdded',
    isNewAddressAdded,
    '###selectedShippingAddressId',
    selectedShippingAddressId
  )
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(
    shippingMethodKeys.detail(
      checkoutId as string,
      isNewAddressAdded?.toString(),
      selectedShippingAddressId
    ),
    () => loadShippingMethods(checkoutId as string),
    {
      cacheTime: 0,
      enabled: !!(checkoutId && (isNewAddressAdded?.toString() || selectedShippingAddressId)),
    }
  )

  return { data, isLoading, isSuccess }
}
