import type { GeoCoords } from './GeoCoords'

export interface CategorySearchParams {
  categoryCode?: string
  pageSize?: number
  filters?: Array<string>
  startIndex?: number
  sort?: string
  query?: string
  filter?: string
}

export interface LocationSearchParams {
  zipcode?: string
  currentLocation?: GeoCoords
}
