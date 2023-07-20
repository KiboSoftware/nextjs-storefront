import { MutationUpdateCustomerB2bAccountUserArgs } from '../gql/types'
import { UpdateCustomerB2bUserParams } from '../types/CustomerB2BUser'

export const buildUpdateCustomerB2bUserParams = (
  params: UpdateCustomerB2bUserParams
): MutationUpdateCustomerB2bAccountUserArgs => {
  const {
    user,
    b2BUser,
    values: { firstName, lastName, emailAddress, isActive },
  } = params

  const updateCustomerB2bUserParam = {
    accountId: user?.id as number,
    userId: b2BUser?.userId as string,
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
