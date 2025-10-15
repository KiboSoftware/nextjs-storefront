import { b2bRole } from '../../../fragments'

const createRoleAsyncMutation = /* GraphQL */ `
  mutation createRoleAsync($accountId: Int!, $b2BRoleInput: B2BRoleInput) {
    createRoleAsync(accountId: $accountId, b2BRoleInput: $b2BRoleInput) {
      ...b2bRole
    }
  }
  ${b2bRole}
`

export default createRoleAsyncMutation
