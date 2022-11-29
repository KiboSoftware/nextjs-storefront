import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchParams } from '@/lib/helpers/buildProductSearchParams'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams } from '@/lib/types'

import type { ProductSearchResult } from '@/lib/gql/types'

export interface UseProductSearchResponse {
  data: ProductSearchResult
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
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
 * [Query hook] useProductSearchQueries uses the graphQL query
 *
 * <b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>
 *
 * Description : Fetches the product details based on search keyword passing by searchParams.
 *
 * Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects route.query like categoryCode, filters, sort, search etc to get the products.
 *
 * On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query
 *
 * @param searchParams Accepts a CategorySearchParams value
 * @param initialData Accepts a ProductSearchResult value
 *
 * @returns 'response?.products', which is list of products.
 */

export const useProductSearchQueries = (
  searchParams: CategorySearchParams,
  initialData?: ProductSearchResult
): UseProductSearchResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    productSearchResultKeys.searchParams(searchParams),
    () => fetchProductSearch(searchParams),
    {
      initialData,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
