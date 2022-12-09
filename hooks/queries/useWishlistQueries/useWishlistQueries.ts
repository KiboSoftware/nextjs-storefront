/**
 * @module useWishlistQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getWishlistQuery } from '@/lib/gql/queries'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import type { CrWishlist } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseWishlistResponse {
  data?: CrWishlist
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getWishlists = async (): Promise<CrWishlist> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getWishlistQuery,
    variables: {},
  })

  return response?.wishlists?.items[0]
}

/**
 * [Query hook] useWishlistQueries uses the graphQL query
 *
 * <b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>
 *
 * Description : Fetches the all wishlists for logged in user. To authenticate the user, request header taking token from the cookie.
 *
 * Parameters passed to function getWishlists()
 *
 * On success, returns the first item of wishlists as it will always have single item with respect to customer account id.
 *
 * @returns 'response?.wishlists?.items[0], which contains the first wishlist item'
 */

export const useWishlistQueries = (): UseWishlistResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(wishlistKeys.all, getWishlists, {
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess, isFetching }
}
