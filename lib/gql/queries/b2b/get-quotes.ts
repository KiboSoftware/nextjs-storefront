import { quoteItemFragment } from '../../fragments'

const getQuotes = /* GraphQL */ `
  query quotes(
    $startIndex: Int
    $pageSize: Int
    $sortBy: String
    $filter: String
    $q: String
    $qLimit: Int
  ) {
    quotes(
      startIndex: $startIndex
      pageSize: $pageSize
      sortBy: $sortBy
      filter: $filter
      q: $q
      qLimit: $qLimit
    ) {
      startIndex
      pageSize
      pageCount
      totalCount
      items {
        ...quoteItemFragment
      }
    }
  }

  ${quoteItemFragment}
`
export default getQuotes
