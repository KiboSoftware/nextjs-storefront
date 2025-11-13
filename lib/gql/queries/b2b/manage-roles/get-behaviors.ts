const getBehaviorsQuery = /* GraphQL */ `
  query getBehaviors {
    getBehaviors {
      totalCount
      items {
        id
        categoryId
        name
        requiresBehaviorIds
        validUserTypes
        isPrivate
        systemRoles
      }
    }
  }
`

export default getBehaviorsQuery
