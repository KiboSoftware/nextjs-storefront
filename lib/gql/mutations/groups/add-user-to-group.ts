const addUserToGroupMutation = /* GraphQL */ `
  mutation addUserToGroup($accountId: Int!, $userId: String!, $groupCode: String!) {
    addUserToGroup(accountId: $accountId, userId: $userId, groupCode: $groupCode) {
      userId
      accountId
    }
  }
`

export default addUserToGroupMutation
