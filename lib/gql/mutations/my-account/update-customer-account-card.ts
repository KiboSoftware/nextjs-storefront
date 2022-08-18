import { paymentCardItems } from '@/lib/gql/fragments/paymentCardItems'

const updateCustomerAccountCard = /* GraphQL */ `
  mutation updateCustomerAccountCard($accountId: Int!, $cardId: String!, $cardInput: CardInput) {
    updateCustomerAccountCard(accountId: $accountId, cardId: $cardId, cardInput: $cardInput) {
      ...customerAccountCardItems
    }
  }
  ${paymentCardItems}
`
export default updateCustomerAccountCard
