import { CustomerB2BUserRole } from '../types/CustomerB2BUser'

export const buildB2bUserRoleParams = (params: any) => {
  const {
    user: { id },
    b2BUser,
    values: { role },
    roles,
  } = params

  const b2BUserRoleParam = {
    accountId: id,
    userId: b2BUser?.userId,
    roleId: roles.find(({ roleName }: CustomerB2BUserRole) => roleName === role)?.roleId,
  }

  return b2BUserRoleParam
}
