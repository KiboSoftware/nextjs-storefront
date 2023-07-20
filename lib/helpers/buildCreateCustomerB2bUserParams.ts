import { MutationCreateCustomerB2bAccountUserArgs } from '../gql/types'
import { CreateCustomerB2bUserParams } from '../types/CustomerB2BUser'

export const buildCreateCustomerB2bUserParams = (
  params: CreateCustomerB2bUserParams
): MutationCreateCustomerB2bAccountUserArgs => {
  const {
    user,
    values: { firstName, lastName, emailAddress },
  } = params

  const createCustomerB2bUserParam = {
    accountId: user?.id as number,
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
