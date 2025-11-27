import { MutationCreateCustomerB2bAccountUserArgs } from '../gql/types'
import { CreateCustomerB2bUserParams } from '../types/CustomerB2BUser'

export const buildCreateCustomerB2bUserParams = (
  params: CreateCustomerB2bUserParams
): MutationCreateCustomerB2bAccountUserArgs => {
  const {
    user,
    values: { firstName, lastName, emailAddress, userName, localeCode, role },
    roles,
  } = params

  const selectedRole = roles?.find((r) => r.roleName === role)
  const roleArray = selectedRole ? [{ roleId: selectedRole.roleId }] : undefined

  const createCustomerB2bUserParam = {
    accountId: user?.id as number,
    b2BUserAndAuthInfoInput: {
      b2BUser: {
        firstName,
        lastName,
        emailAddress,
        userName: userName || emailAddress,
        localeCode: localeCode || 'en-US',
        ...(roleArray && { roles: roleArray }),
      },
    },
  }

  return createCustomerB2bUserParam
}
