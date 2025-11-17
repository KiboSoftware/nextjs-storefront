const addUserRolesAsyncMutation = /* GraphQL */ `
  mutation addUserRolesAsync($accountId: Int!, $userId: String!, $roleId: Int!) {
    addUserRolesAsync(accountId: $accountId, userId: $userId, roleId: $roleId)
  }
`

export default addUserRolesAsyncMutation
