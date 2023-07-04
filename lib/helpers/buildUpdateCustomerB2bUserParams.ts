export const buildUpdateCustomerB2bUserParams = (params: any) => {
  const {
    user: { id },
    b2BUser,
    values: { firstName, lastName, emailAddress, isActive },
  } = params

  const updateCustomerB2bUserParam = {
    accountId: id,
    userId: b2BUser?.userId,
    b2BUserInput: {
      firstName,
      lastName,
      emailAddress,
      isActive,
      userName: emailAddress,
    },
  }

  return updateCustomerB2bUserParam
}
