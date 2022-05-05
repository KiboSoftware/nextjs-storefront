import { categoryInfo } from '../fragments'

export const categoryTreeQuery = /* GraphQL */ `
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
