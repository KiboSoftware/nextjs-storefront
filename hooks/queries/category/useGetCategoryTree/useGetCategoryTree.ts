/**
 * @module useGetCategoryTree
 */
import { useQuery } from '@tanstack/react-query'
import fetch from 'isomorphic-unfetch'

import { CATEGORY_TREE_ENDPOINT } from '@/lib/gql/client'
import { categoryTreeKeys } from '@/lib/react-query/queryKeys'

import type { Maybe, PrCategory } from '@/lib/gql/types'

/**
 * @hidden
 */
export interface UseCategoryResponse {
  data: Maybe<PrCategory>[]
  isLoading: boolean
  isSuccess: boolean
}

const fetchCategoryTree = async () => {
  const endpoint = CATEGORY_TREE_ENDPOINT
  const response = await fetch(endpoint)
  return response.json()
}

/**
 * [Query hook] useGetCategoryTree fetches the data from the GET api call to the <b>/api/category-tree</b>
 *
 * Description : Fetches categories and all related sub categories for the storefront
 *
 * Parameters passed to function fetchCategoryTree()
 *
 * On success, returns the category data items
 *
 * @param initialData stores the category data for the storefront present on server side. Used to check if the data has got stale, if not; cached data is returned.
 *
 * @returns category and related children catagories
 */
export const useGetCategoryTree = (initialData: Maybe<PrCategory>[]): UseCategoryResponse => {
  const {
    data = [],
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: categoryTreeKeys.all,
    queryFn: fetchCategoryTree,
    refetchOnMount: initialData ? false : true,
  })

  return { data, isLoading, isSuccess }
}
