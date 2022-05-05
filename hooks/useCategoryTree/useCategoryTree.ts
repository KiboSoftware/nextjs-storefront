import { useQuery } from 'react-query'
import { request, gql } from 'graphql-request'
import { categoryTreeQuery } from '@/lib/gql/queries'

const fetchCategoryTree = async () => {
  const response = await request(
    '/api/graphql',
    gql`
      ${categoryTreeQuery}
    `
  )
  return response?.categoriesTree
}

export default function useCategoryTree() {
  return useQuery(['category_tree'], () => fetchCategoryTree())
}
