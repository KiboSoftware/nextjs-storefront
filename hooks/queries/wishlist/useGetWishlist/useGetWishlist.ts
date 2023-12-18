/**
 * @module useGetWishlist
 */
import { QueryObserverResult, RefetchOptions, useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getWishlistQuery } from '@/lib/gql/queries'
import { wishlistKeys } from '@/lib/react-query/queryKeys'

import type { CrWishlist, WishlistCollection } from '@/lib/gql/types'

/**
 * @hidden
 */

type UseWishlistResponseData = WishlistCollection | CrWishlist | []
export interface UseWishlistResponse {
  data?: UseWishlistResponseData
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
  isPending: boolean
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<UseWishlistResponseData, Error>>
}

export interface PageProps {
  filter: string
  pageSize: number
  sortBy: string
  startIndex: number
}

const getWishlists = async (params?: PageProps): Promise<UseWishlistResponseData> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getWishlistQuery,
    variables: params ? params : {},
  })

  return params ? response?.wishlists : response?.wishlists?.items[0] || []
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
  const { data, isPending, isSuccess, isFetching, isLoading, refetch } = useQuery({
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
      getWishlists(
        params
          ? {
              ...(params as PageProps),
              startIndex: params ? params?.startIndex + params?.pageSize : 0,
            }
          : undefined
      ),
  })

  return { data, isPending, isSuccess, isFetching, isLoading, refetch }
}
