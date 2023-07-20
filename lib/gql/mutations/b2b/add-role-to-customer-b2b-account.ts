const addRoleToCustomerB2bAccountMutation = /* GraphQL */ `
  mutation addRoleToCustomerB2bAccount($accountId: Int!, $userId: String!, $roleId: Int!) {
    addRoleToCustomerB2bAccount(accountId: $accountId, userId: $userId, roleId: $roleId)
  }
`

export default addRoleToCustomerB2bAccountMutation
