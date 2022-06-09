import { productInfo } from './product'

export const searchFacets = /* GraphQL */ `
  fragment searchFacets on Facet {
    label
    facetType
    field
    values {
      label
      value
      filterValue
      isDisplayed
      count
      isApplied
      childrenFacetValues {
        label
        count
        value
        filterValue
        isDisplayed
        count
      }
    }
  }
`

export const searchResults = /* GraphQL */ `
  fragment searchResults on ProductSearchResult {
    totalCount
    pageSize
    pageCount
    startIndex
    items {
      ...productInfo
    }
    facets {
      ...searchFacets
    }
  }
  ${searchFacets}
  ${productInfo}
`
