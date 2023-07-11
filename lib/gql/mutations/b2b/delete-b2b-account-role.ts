const deleteB2bAccountRoleMutation = /* GraphQL */ `
  mutation deleteB2bAccountRole($accountId: Int!, $userId: String!, $roleId: Int!) {
    deleteB2bAccountRole(accountId: $accountId, userId: $userId, roleId: $roleId)
  }
`

export default deleteB2bAccountRoleMutation
