const getUsersRoleAsyncQuery = /* GraphQL */ `
  query getUsersRoleAsync($accountId: Int!, $userId: String!) {
    getUsersRoleAsync: b2bAccountUserRoles(accountId: $accountId, userId: $userId) {
      totalCount
      items {
        userId
        assignedInScope {
          type
          id
          name
        }
        roleId
        roleName
        roleTags
      }
    }
  }
`

export default getUsersRoleAsyncQuery
