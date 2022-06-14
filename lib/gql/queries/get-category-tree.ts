import { categoryInfo } from '../fragments'

const getCategoryTreeQuery = /* GraphQL */ `
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
export default getCategoryTreeQuery
