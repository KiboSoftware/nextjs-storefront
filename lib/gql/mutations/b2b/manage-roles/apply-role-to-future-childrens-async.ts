const applyRoleToFutureChildrensAsyncMutation = /* GraphQL */ `
  mutation applyRoleToFutureChildrensAsync($roleId: Int!, $accountId: Int!, $enabled: Boolean) {
    applyRoleToFutureChildrensAsync(roleId: $roleId, accountId: $accountId, enabled: $enabled)
  }
`

export default applyRoleToFutureChildrensAsyncMutation
