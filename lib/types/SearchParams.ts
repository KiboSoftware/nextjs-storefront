import type { GeoCoords } from './GeoCoords'

export interface CategorySearchParams {
  categoryCode?: string
  pageSize?: number
  filters?: Array<string>
  startIndex?: number
  sort?: string
  search?: string
  filter?: string
}

export interface LocationSearchParams {
  zipcode?: string
  currentLocation?: GeoCoords
}
