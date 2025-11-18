import { b2bRole } from '../../../fragments'

const updateRoleAsyncMutation = /* GraphQL */ `
  mutation updateRoleAsync($roleId: Int!, $b2BRoleInput: B2BRoleInput) {
    updateRoleAsync(roleId: $roleId, b2BRoleInput: $b2BRoleInput) {
      ...b2bRole
    }
  }
  ${b2bRole}
`

export default updateRoleAsyncMutation
