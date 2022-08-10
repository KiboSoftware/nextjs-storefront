import { userContactFields } from '../fragments/userContacts'

export const getUserAddressesQuery = /* GraphQL */ `
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
