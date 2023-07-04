export const buildCreateCustomerB2bUserParams = (params: any) => {
  const {
    user: { id },
    values: { firstName, lastName, emailAddress },
  } = params

  const createCustomerB2bUserParam = {
    accountId: id,
    b2BUserAndAuthInfoInput: {
      b2BUser: {
        firstName,
        lastName,
        emailAddress,
        userName: emailAddress,
        localeCode: 'en-IN',
      },
    },
  }

  return createCustomerB2bUserParam
}
