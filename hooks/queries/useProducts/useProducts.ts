import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { searchProductsQuery } from '@/lib/gql/queries'
import { buildProductSearchInput } from '@/lib/helpers/buildProductSearchInput'
import { productSearchResultKeys } from '@/lib/react-query/queryKeys'
import type { CategorySearchParams, ProductCodes } from '@/lib/types'

import type { ProductSearchResult } from '@/lib/gql/types'

export interface UseProductsResponse {
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

export const useProducts = (productCodes: ProductCodes[]): UseProductsResponse => {
  const productCodeFilter: Array<string> = []
  productCodes.forEach((code) => {
    productCodeFilter.push(`productCode eq ${code?.productCode}`)
  })
  const searchParams = buildProductSearchInput({
    filter: productCodeFilter.join(' or '),
    pageSize: productCodes?.length as number,
  }) as CategorySearchParams
  const { data, isLoading, isSuccess, isFetching } = useQuery(
    productSearchResultKeys.searchParams(searchParams),
    () => fetchProductSearch(searchParams)
  )

  return { data, isLoading, isSuccess, isFetching }
}
