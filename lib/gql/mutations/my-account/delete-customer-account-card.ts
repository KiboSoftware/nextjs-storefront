const deleteCustomerAccountCard = /* GraphQL */ `
  mutation deleteCustomerAccountCard($accountId: Int!, $cardId: String!) {
    deleteCustomerAccountCard(accountId: $accountId, cardId: $cardId)
  }
`
export default deleteCustomerAccountCard
