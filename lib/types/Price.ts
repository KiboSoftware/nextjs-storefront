import { Maybe } from '../gql/types'

export interface PriceOnly {
  price?: Maybe<string>
}

export interface SalePrice {
  price?: Maybe<string>
  salePrice?: Maybe<string>
}

export interface PriceRange {
  lower: SalePrice
  upper: SalePrice
}
