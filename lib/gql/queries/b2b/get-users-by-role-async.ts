const getUsersByRoleAsyncQuery = /* GraphQL */ `
  query getUsersByRoleAsync($accountId: Int!, $roleId: Int!) {
    getUsersByRoleAsync: getUsersByRoleAsync(accountId: $accountId, roleId: $roleId) {
      emailAddress
      userName
      firstName
      lastName
      localeCode
      userId

      roles {
        roleId
        roleName
        roleTags
      }
      isLocked
      isActive
      isRemoved
      acceptsMarketing
      hasExternalPassword
    }
  }
`

export default getUsersByRoleAsyncQuery
