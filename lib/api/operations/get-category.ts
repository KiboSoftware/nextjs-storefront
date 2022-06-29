import { fetcher } from '@/lib/api/util'

const query = /* GraphQL */ `
  query getProduct($productCode: String!) {
    product(productCode: $productCode) {
      content {
        productName
        productImages {
          imageUrl
        }
      }
      price {
        price
        salePrice
      }
    }
  }
`

export default async function getProduct(productCode: any) {
  const variables = {
    productCode,
  }
  const response = await fetcher({ query, variables }, null)
  return response.data?.product
}
