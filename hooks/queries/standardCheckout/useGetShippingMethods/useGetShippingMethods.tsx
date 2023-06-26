/**
 * @module useGetShippingMethods
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getShippingRates } from '@/lib/gql/queries'
import { shippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { CrShippingRate } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseShippingMethodsResponse {
  data: CrShippingRate[]
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

/**
 * [Query hook] useGetShippingMethods uses the graphQL query
 *
 * <b>orderShipmentMethods(orderId: String!): [ShippingRate]</b>
 *
 * Description : Fetches the shipping methods based on checkout id.
 *
 * Parameters passed to function loadShippingMethods(checkoutId: string) => expects checkoutId
 *
 * On success, returns the received list of shipping methods.
 *
 * @param checkoutId Accepts created checkout id
 *
 * @returns 'response?.orderShipmentMethods', which contains shipping methods based on checkoutId request.
 */

export const useGetShippingMethods = (
  checkoutId: string | null | undefined,
  isNewAddressAdded?: boolean,
  selectedShippingAddressId?: number
): UseShippingMethodsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: shippingMethodKeys.detail(
      checkoutId as string,
      isNewAddressAdded?.toString(),
      selectedShippingAddressId
    ),
    queryFn: () => loadShippingMethods(checkoutId as string),
    // cacheTime: 0,
    enabled: !!(checkoutId && (isNewAddressAdded?.toString() || selectedShippingAddressId)),
  })

  return { data, isLoading, isSuccess }
}
