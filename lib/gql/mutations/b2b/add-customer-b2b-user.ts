const addCustomerB2bUserMutation = /* GraphQL */ `
  mutation createCustomerB2bAccountUser(
    $accountId: Int!
    $b2BUserAndAuthInfoInput: B2BUserAndAuthInfoInput
  ) {
    createCustomerB2bAccountUser(
      accountId: $accountId
      b2BUserAndAuthInfoInput: $b2BUserAndAuthInfoInput
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

export default addCustomerB2bUserMutation
