import { fetcher } from '@/lib/api/util'
import { getProductQuery } from '@/lib/gql/queries/get-product'

export default async function getProduct(productCode: any) {
  const variables = {
    productCode,
  }
  const response = await fetcher({ query: getProductQuery, variables }, null)
  return response.data?.product
}
