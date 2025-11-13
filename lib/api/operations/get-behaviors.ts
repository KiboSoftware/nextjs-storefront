import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import getBehaviorsQuery from '@/lib/gql/queries/b2b/manage-roles/get-behaviors'

export interface Behavior {
  id: number
  categoryId?: number
  name?: string
}

export interface GetBehaviorsResponse {
  totalCount?: number
  items?: Behavior[]
}

export const getBehaviors = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GetBehaviorsResponse | null> => {
  try {
    const headers = req ? getAdditionalHeader(req) : {}
    const response = await fetcher({ query: getBehaviorsQuery, variables: {} }, { headers })

    return response?.data?.getBehaviors || null
  } catch (error) {
    console.error('Error fetching behaviors:', error)
    return null
  }
}
