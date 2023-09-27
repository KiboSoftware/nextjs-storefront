import { MutationCreateCustomerB2bAccountUserArgs } from '../gql/types'
import { CreateCustomerB2bUserParams, CustomerB2BUserRole } from '../types/CustomerB2BUser'

export const buildCreateCustomerB2bUserParams = (
  params: CreateCustomerB2bUserParams
): MutationCreateCustomerB2bAccountUserArgs => {
  const {
    user,
    values: { firstName, lastName, emailAddress, role },
    roles,
  } = params

  const createCustomerB2bUserParam = {
    accountId: user?.id as number,
    b2BUserAndAuthInfoInput: {
      b2BUser: {
        firstName,
        lastName,
        emailAddress,
        userName: emailAddress,
        localeCode: 'en-US',
        roles: [
          {
            roleId: roles.find(({ roleName }: CustomerB2BUserRole) => roleName === role)
              ?.roleId as number,
          },
        ],
      },
    },
  }

  return createCustomerB2bUserParam
}
