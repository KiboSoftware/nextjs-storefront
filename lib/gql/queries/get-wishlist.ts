import { wishlist } from '@/lib/gql/fragments'

const getWishlistQuery = /* GraphQL */ `
  query {
    wishlists {
      items {
        ...wishlist
      }
    }
  }
  ${wishlist}
`

export default getWishlistQuery
