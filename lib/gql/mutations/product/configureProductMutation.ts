import { configureProductInfo } from '../../fragments/configureProduct'

export const productConfigInventoryInfo = /* GraphQL */ `
  fragment productConfigInventoryInfo on ConfiguredProduct {
    inventoryInfo {
      manageStock
      onlineLocationCode
      onlineSoftStockAvailable
      onlineStockAvailable
    }
  }
`

const configureProductMutation = /* GraphQL */ `
  mutation configureProduct(
    $productCode: String!
    $selectedOptions: ProductOptionSelectionsInput!
  ) {
    configureProduct(
      productCode: $productCode
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
