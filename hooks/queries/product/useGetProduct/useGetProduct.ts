/**
 * @module useGetProduct
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getProductQuery } from '@/lib/gql/queries'
import { productKeys } from '@/lib/react-query/queryKeys'
import { ProductCustom } from '@/lib/types'

/**
 * @hidden
 */
export interface UseProductResponse {
  data: ProductCustom
  isLoading: boolean
  isSuccess: boolean
  isFetching: boolean
  isError: boolean
}

const fetchProduct = async (productCode: string) => {
  const variables = {
    productCode,
  }

  const client = makeGraphQLClient()
  const response = await client.request({
    document: getProductQuery,
    variables,
  })

  return response?.product
}

export const useGetProduct = (query?: any): UseProductResponse => {
  const { data, isLoading, isSuccess, isFetching, isError } = useQuery({
    queryKey: productKeys.productParams({ ...query }),
    queryFn: () => fetchProduct(query?.productCode),
    enabled: !!query?.productCode,
  })

  return { data, isLoading, isSuccess, isFetching, isError }
}
