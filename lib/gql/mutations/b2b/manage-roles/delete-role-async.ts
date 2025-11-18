const deleteRoleAsyncMutation = /* GraphQL */ `
  mutation deleteRoleAsync($accountId: Int!, $roleId: Int!) {
    deleteRoleAsync(accountId: $accountId, roleId: $roleId)
  }
`

export default deleteRoleAsyncMutation
