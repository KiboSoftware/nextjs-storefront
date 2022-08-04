import { wishlist } from '@/lib/gql/fragments'

const getWishlistQuery = /* GraphQL */ `
  query wishlists {
    wishlists {
      items {
        ...wishlist
      }
    }
  }
  ${wishlist}
`

export default getWishlistQuery
