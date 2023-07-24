import { wishlist } from '@/lib/gql/fragments'

const getWishlistQuery = /* GraphQL */ `
  query wishlists($pageSize: Int, $startIndex: Int, $sortBy: String, $filter: String) {
    wishlists(pageSize: $pageSize, startIndex: $startIndex, sortBy: $sortBy, filter: $filter) {
      totalCount
      pageCount
      startIndex
      pageSize
      items {
        ...wishlist
      }
    }
  }
  ${wishlist}
`

export default getWishlistQuery
