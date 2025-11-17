import { MutationCreateCustomerB2bAccountUserArgs } from '../gql/types'
import { CreateCustomerB2bUserParams } from '../types/CustomerB2BUser'

export const buildCreateCustomerB2bUserParams = (
  params: CreateCustomerB2bUserParams
): MutationCreateCustomerB2bAccountUserArgs => {
  const {
    user,
    values: { firstName, lastName, emailAddress, roleAssignments },
  } = params

  // Convert roleAssignments to roles array
  const roles = roleAssignments
    ? Object.values(roleAssignments).flatMap((roleIds) =>
        roleIds.map((roleId) => ({
          roleId: parseInt(roleId, 10),
        }))
      )
    : []

  const createCustomerB2bUserParam = {
    accountId: user?.id as number,
    b2BUserAndAuthInfoInput: {
      b2BUser: {
        firstName,
        lastName,
        emailAddress,
        userName: emailAddress,
        localeCode: 'en-US',
        roles,
      },
    },
  }

  return createCustomerB2bUserParam
}
