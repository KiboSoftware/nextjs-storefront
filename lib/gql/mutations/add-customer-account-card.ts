import { paymentCardItems } from '../fragments/paymentCardItems'

const addCustomerAccountCard = /* GraphQL */ `
  mutation createCustomerAccountCard($accountId: Int!, $cardInput: CardInput) {
    createCustomerAccountCard(accountId: $accountId, cardInput: $cardInput) {
      ...customerAccountCardItems
    }
  }
  ${paymentCardItems}
`
export default addCustomerAccountCard
