import { categoryInfo } from '../fragments'

export const getCategoryTreeQuery = /* GraphQL */ `
  ${categoryInfo}

  query {
    categoriesTree {
      items {
        ...categoryInfo
        childrenCategories {
          ...categoryInfo
          childrenCategories {
            ...categoryInfo
            childrenCategories {
              ...categoryInfo
              childrenCategories {
                ...categoryInfo
                childrenCategories {
                  ...categoryInfo
                  childrenCategories {
                    ...categoryInfo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
