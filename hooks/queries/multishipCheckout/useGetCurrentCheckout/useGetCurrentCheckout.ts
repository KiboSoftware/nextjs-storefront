/**
 * @module useGetCurrentCheckout
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getMultiShipCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { Checkout } from '@/lib/gql/types'
interface UseMultiShipCheckout {
  checkoutId: string
  isMultiShip?: boolean
  initialCheckout?: Checkout
}

/**
 * @hidden
 */
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

/**
 * [Query hook] useGetCurrentCheckout uses the graphQL query
 *
 * <b>checkout(checkoutId: String!): Checkout</b>
 *
 * Description : Retrieves the details of a checkout specified by the checkout ID.
 *
 * Parameters passed to function getCheckout(checkoutId: string) => expects checkoutId
 *
 * @returns 'response?.checkout' which contains details related to checkout page like items details, shipping Information etc.;
 */
export const useGetCurrentCheckout = ({
  checkoutId,
  isMultiShip,
  initialCheckout,
}: UseMultiShipCheckout): UseMultiShipCheckoutResponse => {
  const id = checkoutId

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: checkoutKeys.detail(id),
    queryFn: () => getCheckout(checkoutId),
    initialData: initialCheckout,
    enabled: !!isMultiShip,
  })

  return { data, isLoading, isSuccess }
}
