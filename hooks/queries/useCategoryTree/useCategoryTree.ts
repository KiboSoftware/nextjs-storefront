import { useQuery } from 'react-query'

import { makeGraphQLClient } from '@/lib/gql/client'
import { getCategoryTreeQuery } from '@/lib/gql/queries'
import { checkoutKeys } from '@/lib/react-query/queryKeys'

const fetchCategoryTree = async () => {
  const client = makeGraphQLClient()
  const response = await client.request({
    document: getCategoryTreeQuery,
    variables: {},
  })
  return response.categoriesTree.items
}

export const useCategoryTree = (initialData: any): any => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery('categorytree', fetchCategoryTree, { initialData })

  return { data, isLoading, isSuccess }
}
