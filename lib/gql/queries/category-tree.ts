import { categoryInfo } from '../fragments'

const categoryTreeQuery = /* GraphQL */ `
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
export default categoryTreeQuery
