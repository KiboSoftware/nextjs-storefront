import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { b2bAccountUserBehaviorsQuery as query } from '@/lib/gql/queries'
import { decodeParseCookieValue, getAuthCookieName } from '@/lib/helpers'

export interface GetB2BAccountUserBehaviorsParams {
  accountId: number
  userId: string
}

export const getB2BAccountUserBehaviors = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accountId: number
): Promise<number[] | null> => {
  try {
    // Get userId from auth cookie
    const authCookieName = getAuthCookieName()
    const cookies = req?.cookies

    if (!cookies?.[authCookieName]) {
      console.error('No auth cookie found')
      return null
    }

    const authTicket = decodeParseCookieValue(cookies[authCookieName])
    const userId = authTicket?.userId

    if (!userId) {
      console.error('No userId found in auth ticket')
      return null
    }

    const headers = getAdditionalHeader(req)
    const variables = { accountId, userId }

    const response = await fetcher({ query, variables }, { headers })

    return response?.data?.b2bAccountUserBehaviors || null
  } catch (error) {
    console.error(`Error fetching behaviors for account ${accountId}:`, error)
    return null
  }
}

export const getMultipleB2BAccountUserBehaviors = async (
  req: NextApiRequest,
  res: NextApiResponse,
  accountIds: number[]
): Promise<Record<number, number[]>> => {
  try {
    const results = await Promise.all(
      accountIds.map(async (accountId) => {
        const behaviors = await getB2BAccountUserBehaviors(req, res, accountId)
        return { accountId, behaviors: behaviors || [] }
      })
    )

    return results.reduce((acc, { accountId, behaviors }) => {
      acc[accountId] = behaviors
      return acc
    }, {} as Record<number, number[]>)
  } catch (error) {
    console.error('Error fetching behaviors for multiple accounts:', error)
    return {}
  }
}
