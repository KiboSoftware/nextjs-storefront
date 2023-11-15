import { wishlist } from '@/lib/gql/fragments'
export const getCustomerWishlistQuery = /* GraphQL */ `
  query customerWishlist($customerAccountId: Int!, $wishlistName: String!) {
    customerWishlist(customerAccountId: $customerAccountId, wishlistName: $wishlistName) {
      ...wishlist
    }
  }
  ${wishlist}
`
export default getCustomerWishlistQuery
