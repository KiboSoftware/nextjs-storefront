/**
 * @module useGetBehaviors
 */
import { useQuery } from '@tanstack/react-query'

import { makeGraphQLClientWithoutUserClaims } from '@/lib/gql/client'
import getBehaviorsQuery from '@/lib/gql/queries/b2b/manage-roles/get-behaviors'
import { behaviorsKeys } from '@/lib/react-query/queryKeys'

/**
 * @hidden
 */

const client = makeGraphQLClientWithoutUserClaims()

// Define the Behavior interface
export interface Behavior {
  id?: number
  categoryId?: number
  name?: string
  requiresBehaviorIds?: number[]
  validUserTypes?: string[]
  isPrivate?: boolean
  systemRoles?: string[]
}

// Define the response type for getBehaviors
export interface GetBehaviorsResponse {
  totalCount?: number
  items?: Behavior[]
}

const getBehaviors = async (): Promise<GetBehaviorsResponse> => {
  const response = await client.request({
    document: getBehaviorsQuery,
  })

  return response?.getBehaviors
}

/**
 * [Query hook] useGetBehaviors uses the graphQL query
 *
 * <b>getBehaviors(): GetBehaviorsResponse</b>
 *
 * Description : Fetches the list of behaviors available for role management.
 *
 * No parameters required for this query.
 *
 * @returns 'response?.getBehaviors', which contains list of behaviors with total count and detailed behavior information.
 */

export const useGetBehaviors = (initialData?: GetBehaviorsResponse) => {
  const { isLoading, isSuccess, isError, data, error } = useQuery({
    queryKey: behaviorsKeys.all,
    queryFn: () => getBehaviors(),
    placeholderData: (previousData) => previousData ?? undefined,
    initialData,
    retry: 0,
    staleTime: 5 * 60 * 1000, // 5 minutes - behaviors don't change often
    gcTime: 10 * 60 * 1000, // 10 minutes
  })

  return {
    behaviors: data,
    isLoading,
    isError,
    isSuccess,
    error,
  }
}
