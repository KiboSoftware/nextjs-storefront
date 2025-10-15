import { b2bRole } from '../../../fragments/b2b/b2b-role'
const getRolesAsyncQuery = /* GraphQL */ `
  ${b2bRole}
  query getRolesAsync($accountId: Int!) {
    getRolesAsync(accountId: $accountId) {
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

export default getRolesAsyncQuery
