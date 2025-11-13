import { b2bRole } from '../../../fragments/b2b/b2b-role'

const getRoleByRoleIdAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRoleByRoleIdAsync($accountId: Int!, $roleId: Int!) {
    getRoleByRoleIdAsync(accountId: $accountId, roleId: $roleId) {
      ...b2bRole
    }
  }
`

export default getRoleByRoleIdAsyncQuery
