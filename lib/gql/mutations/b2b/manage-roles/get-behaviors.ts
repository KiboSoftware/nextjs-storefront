const getBehaviorsMutation = /* GraphQL */ `
  mutation getBehaviors {
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

export default getBehaviorsMutation
