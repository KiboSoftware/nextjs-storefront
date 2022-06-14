import { fetcher } from '@/lib/api/util'
import { getCategoryTreeQuery } from '@/lib/gql/queries'

export default async function getCategoryTree() {
  try {
    const response = await fetcher({ query: getCategoryTreeQuery, variables: {} })
    return response.data.categoriesTree?.items
  } catch (error) {
    console.log(error)
  }
}
