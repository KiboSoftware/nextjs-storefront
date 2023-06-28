/**
 * @module useGetWishlist
 */
import { useQuery } from '@tanstack/react-query'

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

export interface GetAllWishlistsProps {
  filter: string
  pageSize: number
  sortBy: string
  startIndex: number
}

const getWishlists = async (): Promise<CrWishlist> => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getWishlistQuery,
    variables: {},
  })

  return response?.wishlists?.items[0]
}

const getAllWishlists = async (props: GetAllWishlistsProps) => {
  const { filter = '', pageSize = 5, sortBy = '', startIndex = 0 } = props
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getWishlistQuery,
    variables: {
      filter,
      pageSize,
      sortBy,
      startIndex,
    },
  })
  return response?.wishlists
}

/**
 * [Query hook] useGetWishlist uses the graphQL query
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

export const useGetWishlist = (): UseWishlistResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: wishlistKeys.all,
    queryFn: getWishlists,
    refetchOnWindowFocus: false,
  })

  return { data, isLoading, isSuccess, isFetching }
}

/**
 * [Query hook] useAllGetWishlist uses the graphQL query
 *
 * <b>wishlists(startIndex: Int, pageSize: Int, sortBy: String, filter: String): WishlistCollection</b>
 *
 * Description : Fetches the all wishlists for logged in user. To authenticate the user, request header taking token from the cookie.
 *
 * Parameters passed to function getAllWishlists()
 *
 * On success, returns the all wishlists with respect to customer account id.
 *
 * @returns 'response?.wishlists, which contains the all wishlists item'
 */

export const useGetAllWishlists = (props: GetAllWishlistsProps) => {
  const { filter = '', pageSize = 5, sortBy = '', startIndex = 0 } = props
  const pageKey = [startIndex.toString(), pageSize.toString(), sortBy, filter]
  const nextPageKey = [(startIndex + pageSize).toString(), pageSize.toString(), sortBy, filter]
  const { data, isPending, isSuccess, isFetching } = useQuery({
    queryKey: wishlistKeys.allWishlists.concat(pageKey),
    queryFn: () => getAllWishlists(props),
    refetchOnWindowFocus: false,
  })

  useQuery({
    queryKey: wishlistKeys.allWishlists.concat(nextPageKey),
    queryFn: () => getAllWishlists({ ...props, startIndex: startIndex + pageSize }),
    refetchOnWindowFocus: false,
  })

  return { data, isPending, isSuccess, isFetching }
}
