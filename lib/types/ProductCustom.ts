import { Product } from '../gql/types'

export type ConfigureOption = {
  attributeFQN: string
  value: string
  shopperEnteredValue?: string | boolean
}

export type ProductWithFullmentOptions = {
  fulfillmentMethod: string
  fulfillmentMethodShortName: string
  purchaseLocationCode: string
}

export type ProductCustom = Product & ProductWithFullmentOptions
