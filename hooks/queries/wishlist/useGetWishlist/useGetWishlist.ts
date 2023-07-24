/**
 * @module useGetWishlist
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getWishlistQuery } from '@/lib/gql/queries'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import type { CrWishlist, WishlistCollection } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseWishlistResponse {
  data?: WishlistCollection | CrWishlist | []
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
  isPending: boolean
}

export interface PageProps {
  filter: string
  pageSize: number
  sortBy: string
  startIndex: number
}

const getWishlists = async (params?: PageProps): Promise<WishlistCollection | CrWishlist | []> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getWishlistQuery,
    variables: params ? params : {},
  })

  return params ? response.wishlists : response?.wishlists?.items[0] || []
}

/**
 * [Query hook] useFetWishlists uses the graphQL query
 *
 * <b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>
 *
 * Description : Fetches the all wishlists for logged in user. To authenticate the user, request header taking token from the cookie.
 *
 * Parameters passed to function getAllWishlists()
 *
 * On success, returns the all wishlists with respect to customer account id if params passed correctly.
 *
 * @returns 'response?.wishlists, which contains the all wishlists item'
 *
 * @returns 'response?.wishlists.item[0] || [] if no params passed
 */

export const useGetWishlist = (params?: PageProps): UseWishlistResponse => {
  const { data, isPending, isSuccess, isFetching, isLoading } = useQuery({
    queryKey: params ? wishlistKeys.page(params) : wishlistKeys.all,
    queryFn: () => getWishlists(params),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData ?? undefined,
  })

  useQuery({
    queryKey: params
      ? wishlistKeys.page({ ...params, startIndex: params.startIndex + params.pageSize })
      : wishlistKeys.all,
    queryFn: () =>
      params && getWishlists({ ...params, startIndex: params.startIndex + params.pageSize }),
  })

  return { data, isPending, isSuccess, isFetching, isLoading }
}
