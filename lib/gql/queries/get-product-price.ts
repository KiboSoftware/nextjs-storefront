/* eslint-disable import/no-named-as-default */

import { productPrices } from '../fragments'

const getProductPriceQuery = /* GraphQL */ `
  ${productPrices}

  query getProductPrice($productCode: String!, $useSubscriptionPricing: Boolean, $quantity: Int) {
    product(
      productCode: $productCode
      useSubscriptionPricing: $useSubscriptionPricing
      quantity: $quantity
    ) {
      ...productPrices
    }
  }
`
export default getProductPriceQuery
