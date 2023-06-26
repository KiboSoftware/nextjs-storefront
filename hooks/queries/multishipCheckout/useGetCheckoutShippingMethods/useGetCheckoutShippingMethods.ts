/**
 * @module useGetCheckoutShippingMethods
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutShippingMethodsQuery } from '@/lib/gql/queries'
import { shippingMethodKeys } from '@/lib/react-query/queryKeys'

import type { CheckoutGroupRates } from '@/lib/gql/types'

/**
 * @hidden
 */
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

/**
 * [Query hook] useGetCheckoutShippingMethods uses the graphQL query
 *
 * <b>checkoutShippingMethods(checkoutId: String!): [CheckoutGroupRates]</b>
 *
 * Description : Retrieves available shipping methods for groupings. Typically used to display available shipping method options on the checkout page.
 *
 * Parameters passed to function loadShippingMethods(checkoutId: string) => expects checkoutId
 *
 * @param checkoutId stores checkoutId
 * @param selectedShippingAddressId stores the id of selected shipping address
 *
 * @returns 'response?.checkout' which contains available shipping methods for groupings
 */
export const useGetCheckoutShippingMethods = (
  checkoutId: string | null | undefined,
  selectedShippingAddressId?: string | null
): UseCheckoutShippingMethodsResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: shippingMethodKeys.detail(checkoutId as string, selectedShippingAddressId as string),
    queryFn: () => loadShippingMethods(checkoutId as string),
    // cacheTime: 0,
    enabled: !!(checkoutId && selectedShippingAddressId),
  })

  return { data, isLoading, isSuccess }
}
