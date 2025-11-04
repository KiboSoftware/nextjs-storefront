const b2bAccountUserBehaviorsQuery = /* GraphQL */ `
  query b2bAccountUserBehaviors($accountId: Int!, $userId: String!) {
    b2bAccountUserBehaviors(accountId: $accountId, userId: $userId)
  }
`

export default b2bAccountUserBehaviorsQuery
