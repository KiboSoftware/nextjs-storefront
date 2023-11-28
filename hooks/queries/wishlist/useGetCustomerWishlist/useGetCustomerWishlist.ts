/**
 * @module useGetQuoteById
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCustomerWishlistQuery } from '@/lib/gql/queries'
import { customerWishlistKeys } from '@/lib/react-query/queryKeys'

import type { CrWishlist } from '@/lib/gql/types'
interface UseGetCustomerWishlist {
  customerAccountId: number
  wishlistName: string
}

/**
 * @hidden
 */
export interface UseGetCustomerWishlistResponse {
  data: CrWishlist | undefined
  isLoading: boolean
  isSuccess: boolean
}

const getCustomerWishlist = async (
  customerAccountId: number,
  wishlistName: string
): Promise<CrWishlist> => {
  const client = makeGraphQLClient()

  const response = await client.request({
    document: getCustomerWishlistQuery,
    variables: { customerAccountId, wishlistName },
  })

  return response?.customerWishlist
}

/**
 * [Query hook] useGetCustomerWishlist uses the graphQL query
 *
 * <b>customerWishlist(customerAccountId: Int!,wishlistName: String!): CrWishlist</b>
 *
 * Description : Retrieves the details of a wishlist specified by the customer account id and wishlist name.
 *
 * Parameters passed to function getCustomerWishlist(customerAccountId: number,
  wishlistName: string) => expects customerAccountId and wishlistName
 *
 * @returns 'response?.customerWishlist' which contains details related to particular wishlist.;
 */
export const useGetCustomerWishlist = ({
  customerAccountId,
  wishlistName,
}: UseGetCustomerWishlist): UseGetCustomerWishlistResponse => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: customerWishlistKeys.detail(wishlistName),
    queryFn: () => getCustomerWishlist(customerAccountId, wishlistName),
    enabled: !!customerAccountId && !!wishlistName,
  })

  return { data, isLoading, isSuccess }
}
