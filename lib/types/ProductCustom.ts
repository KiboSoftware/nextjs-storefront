import { Product } from '../gql/types'

export type ProductWithFulfillmentOptions = {
  fulfillmentMethod: string
  fulfillmentMethodShortName: string
  purchaseLocationCode: string
}

export type ProductCustom = Product & ProductWithFulfillmentOptions
