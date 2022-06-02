/* eslint-disable import/no-named-as-default */

import { productInfo } from '../fragments/product'

export const getProductQuery = /* GraphQL */ `
  ${productInfo}

  query product($productCode: String!) {
    product(productCode: $productCode) {
      ...productInfo
    }
  }
`
