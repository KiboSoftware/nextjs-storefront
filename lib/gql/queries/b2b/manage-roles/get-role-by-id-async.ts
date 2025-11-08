import { b2bRole } from '../../../fragments/b2b/b2b-role'

const getRoleByIdAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRoleByIdAsync($roleId: Int!) {
    getRoleByRoleIdAsync(roleId: $roleId) {
      ...b2bRole
    }
  }
`

export default getRoleByIdAsyncQuery
