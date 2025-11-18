import { b2bRole } from '../../../fragments'

const createRoleAsyncMutation = /* GraphQL */ `
  mutation createRoleAsync($b2BRoleInput: B2BRoleInput) {
    createRoleAsync(b2BRoleInput: $b2BRoleInput) {
      ...b2bRole
    }
  }
  ${b2bRole}
`

export default createRoleAsyncMutation
