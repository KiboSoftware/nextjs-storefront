const getCustomerB2BAccountUsers = /* GraphQL */ `
  query b2bAccountUsers(
    $b2bAccountId: Int!
    $filter: String
    $pageSize: Int
    $startIndex: Int
    $q: String
  ) {
    b2bAccountUsers(
      accountId: $b2bAccountId
      filter: $filter
      pageSize: $pageSize
      startIndex: $startIndex
      q: $q
    ) {
      totalCount
      items {
        emailAddress
        firstName
        lastName
        isActive
        userId
        roles {
          roleId
          roleName
          roleTags
          assignedInScope {
            id
            name
            type
          }
        }
      }
    }
  }
`

export default getCustomerB2BAccountUsers
