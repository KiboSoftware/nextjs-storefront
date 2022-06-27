import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchInput } from '@/lib/helpers/buildProductSearchInput'

import type { ProductSearchResult } from '@/lib/gql/types'
import type { CategorySearchParams } from '@/lib/types'

export interface UseProductSearchResponse {
  data: ProductSearchResult
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
}

const fetchProductSearch = async (searchParams: CategorySearchParams) => {
  const productSearchInput = buildProductSearchInput(searchParams)
  const client = makeGraphQLClient()
  const response = await client.request({
    document: searchProductsQuery,
    variables: productSearchInput,
  })
  return response.products
}

export const useProductSearch = (
  searchParams: CategorySearchParams,
  initialData: ProductSearchResult
): UseProductSearchResponse => {
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    ['productSearch', searchParams],
    () => fetchProductSearch(searchParams),
    {
      initialData,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isLoading, isSuccess, isFetching }
}
