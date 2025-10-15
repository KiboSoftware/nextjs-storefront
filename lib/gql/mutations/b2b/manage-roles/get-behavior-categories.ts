const getBehaviorCategoriesMutation = /* GraphQL */ `
  mutation getBehaviorCategories {
    getBehaviorCategories {
      totalCount
      items {
        id
        name
      }
    }
  }
`

export default getBehaviorCategoriesMutation
