import type { GeoCoords } from './GeoCoords'

interface ProductCodes {
  productCode: string
}
export interface CategorySearchParams {
  categoryCode?: string
  pageSize?: number
  filters?: Array<string>
  startIndex?: number
  sort?: string
  search?: string
  filter?: string
  productCodes?: ProductCodes[]
}

export interface LocationSearchParams {
  zipcode?: string
  currentLocation?: GeoCoords
}
