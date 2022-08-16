export const updatePassword = /* GraphQL */ `
  mutation changeCustomerAccountPassword(
    $accountId: Int!
    $unlockAccount: Boolean
    $userId: String
    $passwordInfoInput: PasswordInfoInput
  ) {
    changeCustomerAccountPassword(
      accountId: $accountId
      unlockAccount: $unlockAccount
      userId: $userId
      passwordInfoInput: $passwordInfoInput
    )
  }
`
