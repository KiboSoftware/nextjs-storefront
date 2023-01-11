/* eslint-disable import/no-named-as-default */

import { productPrices } from '../fragments'

const getProductPriceQuery = /* GraphQL */ `
  ${productPrices}

  query getProductPrice($productCode: String!, $useSubscriptionPricing: Boolean) {
    product(productCode: $productCode, useSubscriptionPricing: $useSubscriptionPricing) {
      ...productPrices
    }
  }
`
export default getProductPriceQuery
