/**
 * @module useGetProduct
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getProductQuery } from '@/lib/gql/queries'
import { productKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */
export interface UseProductResponse {
  data: any
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

export const useGetProduct = (
  productCode: string,
  isPreviewCookie?: boolean,
  initialData?: any
): UseProductResponse => {
  const { data, isLoading, isSuccess, isFetching, isError } = useQuery({
    queryKey: productKeys.productParams(productCode, false, isPreviewCookie),
    queryFn: () => fetchProduct(productCode),
    enabled: !!productCode && isPreviewCookie,
    initialData,
  })

  return { data, isLoading, isSuccess, isFetching, isError }
}
