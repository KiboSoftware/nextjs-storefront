export const categoryInfo = /* GraphQL */ `
  fragment categoryInfo on PrCategory {
    count
    categoryId
    categoryCode
    isDisplayed
    content {
      name
      slug
      description
    }
  }
`
