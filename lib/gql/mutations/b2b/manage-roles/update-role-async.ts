import { b2bRole } from '../../../fragments'

const updateRoleAsyncMutation = /* GraphQL */ `
  mutation updateRoleAsync($accountId: Int!, $roleId: Int!, $b2BRoleInput: B2BRoleInput) {
    updateRoleAsync(accountId: $accountId, roleId: $roleId, b2BRoleInput: $b2BRoleInput) {
      ...b2bRole
    }
  }
  ${b2bRole}
`

export default updateRoleAsyncMutation
