import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCartQuery } from '@/lib/gql/queries'
import { cartKeys } from '@/lib/react-query/queryKeys'

import type { Cart } from '@/lib/gql/types'

export interface UseCartType {
  data: Cart
  isLoading: boolean
  isSuccess: boolean
}

const getCurrentCart = async () => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getCartQuery,
    variables: {},
  })
  return response?.currentCart
}

/**
 * [ Query hook => useCartQueries uses the graphql query 'currentCart: Cart' ]
 *
 * Description : Fetches details about to the items present currently in the cart.
 *
 * On success, returns the current cart items with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param initialData stores the data for cart present on server side. Used to check if the data has got stale, if not; data is not fetched again.
 * @returns 'response?.currentCart' all the updated items present in cart if the data has got stale
 */
export const useCartQueries = (initialData: Cart): UseCartType => {
  try {
    const {
      data = {},
      isLoading,
      isSuccess,
    } = useQuery(cartKeys.all, getCurrentCart, {
      initialData,
      refetchOnWindowFocus: false,
    })

    return { data, isLoading, isSuccess }
  } catch (err) {
    throw new Error()
  }
}
