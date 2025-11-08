const deleteRoleAsyncMutation = /* GraphQL */ `
  mutation deleteRoleAsync($roleId: Int!) {
    deleteRoleAsync(roleId: $roleId)
  }
`

export default deleteRoleAsyncMutation
