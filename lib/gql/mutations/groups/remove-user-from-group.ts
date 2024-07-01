const removeUserFromGroupMutation = /* GraphQL */ `
  mutation removeUserFromGroup($accountId: Int!, $userId: String!, $groupCode: String!) {
    removeUserFromGroup(accountId: $accountId, userId: $userId, groupCode: $groupCode)
  }
`

export default removeUserFromGroupMutation
