export const updateForgottenAccountPassword = /* GraphQL */ `
  mutation updateForgottenAccountPassword($confirmationInfoInput: ConfirmationInfoInput) {
    updatePassword: updateForgottenCustomerAccountPassword(
      confirmationInfoInput: $confirmationInfoInput
    )
  }
`
export default updateForgottenAccountPassword
