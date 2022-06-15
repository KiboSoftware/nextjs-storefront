import { categoryInfo } from '../fragments'

const getCategoryTreeQuery = /* GraphQL */ `
  ${categoryInfo}

  query getCategoryTreeQuery {
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
