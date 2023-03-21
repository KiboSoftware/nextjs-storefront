/**
 * @module useCheckoutQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCheckoutQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

import type { CrOrder } from '@/lib/gql/types'
interface UseCheckout {
  checkoutId?: string
  isMultiship?: boolean
  initialCheckout?: CrOrder
}

/**
 * @hidden
 */
export interface UseCheckoutResponse {
  data: CrOrder | undefined
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

/**
 * [Query hook] useCheckoutQueries uses the graphQL query
 *
 * <b>checkout(checkoutId: String!): Checkout</b>
 *
 * Description : Fetches the data required on checkout steps(items, fulfillment info, discounts(if any) etc.)
 *
 * Parameters passed to function getCheckout(checkoutId?: string | null) => expects checkoutId.
 *
 * On success, returns the checkout
 *
 * @param checkoutId passing the created checkout id
 * @param initialCheckout stores the data for checkout present on server side. Used to check if the data has got stale, if not; data is not fetched again.
 *
 * @returns 'response?.checkout' which contains checkout details
 */

export const useCheckoutQueries = ({
  checkoutId,
  isMultiship,
  initialCheckout,
}: UseCheckout): UseCheckoutResponse => {
  const id = checkoutId as string

  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(checkoutKeys.detail(id), () => getCheckout(checkoutId), {
    initialData: initialCheckout,
    enabled: !isMultiship,
  })

  return { data, isLoading, isSuccess }
}
