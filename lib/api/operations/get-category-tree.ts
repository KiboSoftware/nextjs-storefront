import { fetcher } from '@/lib/api/util'
import { categoryTreeQuery } from '@/lib/gql/queries/get-category-tree'

export default async function getCategoryTree() {
  const response = await fetcher({ query: categoryTreeQuery, variables: {} })
  return response.data.categoriesTree
}
