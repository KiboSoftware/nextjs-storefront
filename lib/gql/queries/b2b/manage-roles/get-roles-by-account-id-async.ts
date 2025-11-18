import { b2bRole } from '../../../fragments/b2b/b2b-role'
const getRolesByAccountIdAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRolesByAccountIdAsync($accountId: Int!) {
    getRolesByAccountIdAsync(accountId: $accountId) {
      startIndex
      pageSize
      pageCount
      totalCount
      items {
        ...b2bRole
      }
    }
  }
`
export default getRolesByAccountIdAsyncQuery
