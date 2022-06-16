import { Product } from '../gql/types'

export type ProductWithFullmentOptions = {
  fulfillmentMethod: string
  fulfillmentMethodShortName: string
  purchaseLocationCode: string
}

export type ProductCustom = Product & ProductWithFullmentOptions
