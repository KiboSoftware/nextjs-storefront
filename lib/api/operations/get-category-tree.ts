import { fetcher } from '@/lib/api/util'
import { getCategoryTreeQuery } from '@/lib/gql/queries/get-category-tree'

export default async function getCategoryTree() {
  const response = await fetcher({ query: getCategoryTreeQuery, variables: {} })
  return response.data.categoriesTree
}
