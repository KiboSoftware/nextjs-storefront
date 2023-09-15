import { B2bUserRoleParams, CustomerB2BUserRole } from '../types/CustomerB2BUser'

export const buildB2bUserRoleParams = (params: B2bUserRoleParams) => {
  const { user, b2BUser, values, roles } = params
  const b2BUserRoleParam = {
    accountId: user?.id as number,
    userId: b2BUser?.userId,
    roleId: roles.find(({ roleName }: CustomerB2BUserRole) => roleName === values?.role)?.roleId,
  }

  return b2BUserRoleParam
}
