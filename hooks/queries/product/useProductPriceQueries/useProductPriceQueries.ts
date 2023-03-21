/**
 * @module useProductPriceQueries
 */
import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getProductPriceQuery } from '@/lib/gql/queries'
import { productKeys } from '@/lib/react-query/queryKeys'

import type { Product } from '@/lib/gql/types'
/**
 * @hidden
 */
export interface useProductPriceResponse {
  data: Product
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const fetchProductPrice = async (productCode: string, useSubscriptionPricing?: boolean) => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getProductPriceQuery,
    variables: { productCode, useSubscriptionPricing },
  })

  return response.product
}

/**
 * [Query hook] useProductPriceQueries uses the graphQL query
 *
 * Description : Fetches the price details based on product code and useSubscriptionPricing.
 *
 * Parameters passed to function fetchProductPrice( productCode: String, useSubscriptionPricing: Boolean)
 *
 * On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param productCode unique product code for which inventory needed to be fetched
 * @param useSubscriptionPricing used to check if the product has subscription price or not
 *
 * @returns 'response?.product', which contains list of product price.
 */

export const useProductPriceQueries = (
  productCode: string,
  useSubscriptionPricing: boolean
): useProductPriceResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
    isFetching,
  } = useQuery(
    productKeys.productParams(productCode, useSubscriptionPricing),
    () => fetchProductPrice(productCode, useSubscriptionPricing),
    {
      enabled: !!productCode,
      refetchOnWindowFocus: true,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
