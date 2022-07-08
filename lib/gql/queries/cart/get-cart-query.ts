import { cartDetails } from '../../fragments/cart'
const getCartQuery = /* GraphQL */ `
  ${cartDetails}

  query cart {
    currentCart {
      ...cartDetails
    }
  }
`
export default getCartQuery
