import { b2bRole } from '../../../fragments/b2b/b2b-role'

const getRoleByRoleIdAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRoleByRoleIdAsync($roleId: Int!) {
    getRoleByRoleIdAsync(roleId: $roleId) {
      ...b2bRole
    }
  }
`

export default getRoleByRoleIdAsyncQuery
