import fetch from 'isomorphic-unfetch'
import { useQuery } from 'react-query'

import { makeCategoryTreeGraphEndPoint } from '@/lib/gql/client'
import { categoryTreeKeys } from '@/lib/react-query/queryKeys'

import type { Maybe, PrCategory } from '@/lib/gql/types'

export interface UseCategoryResponse {
  data: Maybe<PrCategory>[]
  isLoading: boolean
  isSuccess: boolean
}

const fetchCategoryTree = async () => {
  const endpoint = makeCategoryTreeGraphEndPoint()
  const response = await fetch(endpoint)
  return response.json()
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
