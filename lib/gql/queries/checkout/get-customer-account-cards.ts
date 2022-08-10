import { paymentCardItems } from '../../fragments/paymentCardItems'

const getCustomerAccountCards = /* GraphQL */ `
  query customerAccountCards($accountId: Int!) {
    customerAccountCards(accountId: $accountId) {
      items {
        ...customerAccountCardItems
      }
    }
  }
  ${paymentCardItems}
`
export default getCustomerAccountCards
