export interface SortingValues {
  value: string
  id: string
}

export interface QuoteSortingOptions {
  options: SortingValues[]
  selected: string
}

export interface QuoteFilters {
  expirationDate?: string
  createDate?: string
  status?: string
  name?: string
  number?: string
  others?: string
}
