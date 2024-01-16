/**
 * @module useGetSearchedProducts
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers/buildProductSearchParams'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'

import type { ProductSearchResult } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseProductSearchResponse {
  data: ProductSearchResult
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
  isError: boolean
}

const fetchProductSearch = async (searchParams: CategorySearchParams) => {
  const productSearchInput = buildProductSearchParams(searchParams)
  const client = makeGraphQLClient()
  const response = await client.request({
    document: searchProductsQuery,
    variables: productSearchInput,
  })
  return response?.products
}

/**
 * [Query hook] useGetSearchedProducts uses the graphQL query
 *
 * <b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>
 *
 * Description : Fetches the product details based on search keyword passing by searchParams.
 *
 * Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects object of type CategorySearchParams containing categoryCode, pageSize, filters, startIndex, sort, search, filter.
 *
 * On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param searchParams get required values from route.query and used inside the search params
 * @param initialData stores the data for cart present on server side. Used to check if the data has got stale, if not; data is not fetched again.
 *
 * @returns 'response?.products', which contains list of products based of search request.
 */

export const useGetSearchedProducts = (
  searchParams: CategorySearchParams,
  initialData?: ProductSearchResult
): UseProductSearchResponse => {
  const { data, isLoading, isSuccess, isFetching, isError } = useQuery({
    queryKey: productSearchResultKeys.searchParams(searchParams),
    queryFn: () => fetchProductSearch(searchParams),
    initialData,
    refetchOnWindowFocus: false,
    enabled: searchParams.search !== '',
  })

  return { data, isLoading, isSuccess, isFetching, isError }
}
