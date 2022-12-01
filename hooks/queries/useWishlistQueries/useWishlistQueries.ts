/**
 * @module query_useWishlist
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getWishlistQuery } from '@/lib/gql/queries'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import type { Wishlist } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseWishlistResponse {
  data?: Wishlist
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const getWishlists = async (): Promise<Wishlist> => {
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
 * Description : Fetches the all wishlists
 *
 * Parameters passed to function getWishlists()
 *
 * On success, returns the first item of wishlists
 *
 * @returns 'response?.wishlists?.items[0], which contains the first wishlist item'
 */

export const useWishlistQueries = (): UseWishlistResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(wishlistKeys.all, getWishlists, {
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess, isFetching }
}
