const updateCustomerB2bUserMutation = /* GraphQL */ `
  mutation updateCustomerB2bAccountUser(
    $accountId: Int!
    $userId: String!
    $b2BUserInput: B2BUserInput
  ) {
    updateCustomerB2bAccountUser(
      accountId: $accountId
      userId: $userId
      b2BUserInput: $b2BUserInput
    ) {
      firstName
      lastName
      emailAddress
      userName
      userId
      roles {
        roleId
        roleName
      }
    }
  }
`

export default updateCustomerB2bUserMutation
