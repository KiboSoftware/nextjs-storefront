import { userContactFields } from '../fragments'

const getUserAddressesQuery = /* GraphQL */ `
  query getUserAddresses($accountId: Int!, $startIndex: Int, $pageSize: Int) {
    customerAccountContacts(accountId: $accountId, startIndex: $startIndex, pageSize: $pageSize) {
      pageCount
      totalCount
      items {
        ...userContactFields
      }
    }
  }

  ${userContactFields}
`

export default getUserAddressesQuery
