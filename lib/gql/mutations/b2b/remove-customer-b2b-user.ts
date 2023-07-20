const removeCustomerB2bUserMutation = /* GraphQL */ `
  mutation removeCustomerB2bAccountUser($accountId: Int!, $userId: String!) {
    removeCustomerB2bAccountUser(accountId: $accountId, userId: $userId)
  }
`

export default removeCustomerB2bUserMutation
