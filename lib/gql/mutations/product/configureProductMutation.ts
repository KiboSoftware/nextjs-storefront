import { configureProductInfo } from '../../fragments/configureProduct'

export const productConfigInventoryInfo = /* GraphQL */ `
  fragment productConfigInventoryInfo on ConfiguredProduct {
    inventoryInfo {
      manageStock
      onlineLocationCode
      onlineSoftStockAvailable
      onlineStockAvailable
      outOfStockBehavior
    }
  }
`

const configureProductMutation = /* GraphQL */ `
  mutation configureProduct(
    $productCode: String!
    $quantity: Int!
    $selectedOptions: ProductOptionSelectionsInput!
  ) {
    configureProduct(
      productCode: $productCode
      quantity: $quantity
      includeOptionDetails: true
      productOptionSelectionsInput: $selectedOptions
    ) {
      ...configureProductInfo
      ...productConfigInventoryInfo
    }
  }
  ${configureProductInfo}
  ${productConfigInventoryInfo}
`
export default configureProductMutation
