/**
 * @module useGetBehaviorCategories
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import getBehaviorCategoriesQuery from '@/lib/gql/queries/b2b/manage-roles/get-behavior-categories'
import { behaviorCategoriesKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the BehaviorCategory interface
export interface BehaviorCategory {
  id: number
  name?: string
}

// Define the response type for getBehaviorCategories
export interface GetBehaviorCategoriesResponse {
  totalCount?: number
  items?: BehaviorCategory[]
}

const getBehaviorCategories = async (): Promise<GetBehaviorCategoriesResponse> => {
  const response = await client.request({
    document: getBehaviorCategoriesQuery,
  })

  return response?.getBehaviorCategories
}

/**
 * [Query hook] useGetBehaviorCategories uses the graphQL query
 *
 * <b>getBehaviorCategories(): GetBehaviorCategoriesResponse</b>
 *
 * Description : Fetches the list of behavior categories for role management.
 *
 * No parameters required for this query.
 *
 * @returns 'response?.getBehaviorCategories', which contains list of behavior categories with total count.
 */

export const useGetBehaviorCategories = (initialData?: GetBehaviorCategoriesResponse) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: behaviorCategoriesKeys.all,
    queryFn: () => getBehaviorCategories(),
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
  })

  return {
    behaviorCategories: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
