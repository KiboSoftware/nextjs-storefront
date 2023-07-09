export const resetAccountPassword = /* GraphQL */ `
  mutation resetAccountPassword($resetPasswordInfoInput: ResetPasswordInfoInput) {
    resetPassword: resetCustomerAccountPassword(resetPasswordInfoInput: $resetPasswordInfoInput)
  }
`
