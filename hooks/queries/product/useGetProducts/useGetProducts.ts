/**
 * @module useGetProducts
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'

import type { ProductSearchResult } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseProductsResponse {
  data: ProductSearchResult
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const fetchProductSearch = async (searchParams: CategorySearchParams) => {
  // const productSearchInput = buildProductSearchParams(searchParams)
  const client = makeGraphQLClient()
  const response = await client.request({
    document: searchProductsQuery,
    variables: { ...searchParams, query: searchParams.search },
  })
  return response.products
}

/**
 * [Query hook] useGetProducts uses the graphQL query
 *
 * <b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>
 *
 * Description : Fetches the product details based on filter and pagesize, here filter contains product codes.
 *
 * Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects object of type CategorySearchParams containing categoryCode, pageSize, filters, startIndex, sort, search, filter.
 *
 * On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param productCodes Accept array of product code and converting it to string with separated by 'or' to be used further.
 *
 * @returns 'response?.products', which contains list of products based on search request.
 */

export const useGetProducts = ({
  productCodes,
  query,
}: {
  productCodes?: Array<string>
  query?: string
}): UseProductsResponse => {
  const productCodeFilter: Array<string> = []
  productCodes?.forEach((code) => {
    productCodeFilter.push(`productCode eq ${code}`)
  })
  const searchParams = {
    filter: productCodeFilter.join(' or '),
    search: query,
  }

  const { data, isLoading, isSuccess, isFetching } = useQuery({
    queryKey: productSearchResultKeys.searchParams(searchParams),
    queryFn: () => fetchProductSearch(searchParams),
    enabled: !!searchParams.filter || !!query,
  })

  return { data, isLoading, isSuccess, isFetching }
}
