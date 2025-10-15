import { b2bRole } from '../../../fragments/b2b/b2b-role'

const getRoleByIdAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRoleByIdAsync($accountId: Int!, $roleId: Int!) {
    getRoleByIdAsync(accountId: $accountId, roleId: $roleId) {
      ...b2bRole
    }
  }
`

export default getRoleByIdAsyncQuery
