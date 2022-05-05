import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'

const fetchCategoryTree = async () => {
  const response = await request(
    '/api/graphql',
    gql`
      query {
        categoriesTree {
          items {
            content {
              name
            }
          }
        }
      }
    `
  )
  return response?.categoriesTree
}

export default function useCategoryTree() {
  return useQuery(['category_tree'], () => fetchCategoryTree())
}
