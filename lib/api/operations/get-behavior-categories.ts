import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { getBehaviorCategoriesMutation as query } from '@/lib/gql/mutations'

export interface BehaviorCategory {
  id: number
  name?: string
}

export interface GetBehaviorCategoriesResponse {
  totalCount?: number
  items?: BehaviorCategory[]
}

export const getBehaviorCategories = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<GetBehaviorCategoriesResponse | null> => {
  try {
    const headers = req ? getAdditionalHeader(req) : {}
    const response = await fetcher({ query, variables: {} }, { headers })

    return response?.data?.getBehaviorCategories || null
  } catch (error) {
    console.error('Error fetching behavior categories:', error)
    return null
  }
}
