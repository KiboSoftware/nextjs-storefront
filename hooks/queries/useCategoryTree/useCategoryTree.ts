import { useQuery } from 'react-query'

import { makeCategoryTreeGraphQLClient } from '@/lib/gql/client'
import { getCategoryTreeQuery } from '@/lib/gql/queries'
import { categoryTreeKeys } from '@/lib/react-query/queryKeys'

import type { Maybe, PrCategory } from '@/lib/gql/types'

export interface UseCategoryResponse {
  data: Maybe<PrCategory>[]
  isLoading: boolean
  isSuccess: boolean
}

const fetchCategoryTree = async () => {
  const client = makeCategoryTreeGraphQLClient()
  const response = await client.request({
    document: getCategoryTreeQuery,
    variables: {},
  })

  return response.categoriesTree.items
}

export const useCategoryTree = (initialData: Maybe<PrCategory>[]): UseCategoryResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery(categoryTreeKeys.all, fetchCategoryTree, {
    refetchOnMount: initialData ? false : true,
  })

  return { data, isLoading, isSuccess }
}
