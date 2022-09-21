import { searchResults } from '@/lib/gql/fragments'

const searchProductsQuery = /* GraphQL */ `
  query ProductSearch(
    $query: String
    $startIndex: Int
    $filter: String
    $pageSize: Int
    $sortBy: String
    $facet: String
    $facetHierValue: String
    $facetTemplate: String
    $facetValueFilter: String
  ) {
    products: productSearch(
      query: $query
      filter: $filter
      startIndex: $startIndex
      pageSize: $pageSize
      facet: $facet
      sortBy: $sortBy
      facetHierValue: $facetHierValue
      facetTemplate: $facetTemplate
      facetValueFilter: $facetValueFilter
    ) {
      ...searchResults
    }
  }
  ${searchResults}
`

export default searchProductsQuery
