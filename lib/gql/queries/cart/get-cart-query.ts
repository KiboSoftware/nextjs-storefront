import { cartDetails } from '../../fragments/cart'
const getCartQuery = /* GraphQL */ `
  ${cartDetails}

  query cart {
    currentCar {
      ...cartDetails
    }
  }
`
export default getCartQuery
