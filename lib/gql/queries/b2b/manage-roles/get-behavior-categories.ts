const getBehaviorCategoriesQuery = /* GraphQL */ `
  query getBehaviorCategories {
    getBehaviorCategories {
      totalCount
      items {
        id
        name
      }
    }
  }
`

export default getBehaviorCategoriesQuery
