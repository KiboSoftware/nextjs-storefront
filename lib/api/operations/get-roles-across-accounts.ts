import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getRolesByAccountIdAsyncQuery } from '@/lib/gql/queries'

export interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
  accountIds?: number[]
}

export interface GetRolesAsyncResponse {
  startIndex?: number
  pageSize?: number
  pageCount?: number
  totalCount?: number
  items?: B2BRole[]
}

export interface AccountRolesMap {
  [accountId: number]: GetRolesAsyncResponse
}

/**
 * Fetch roles for multiple accounts in parallel
 */
export default async function getRolesAcrossAccounts(
  req: NextApiRequest,
  res: NextApiResponse,
  accountIds: number[]
): Promise<AccountRolesMap> {
  if (!accountIds.length) {
    return {}
  }

  try {
    const userClaims = await getUserClaimsFromRequest(req, res)
    const headers = getAdditionalHeader(req)

    // Fetch roles for each account in parallel
    const rolesPromises = accountIds.map(async (accountId) => {
      try {
        const pageSize = 200
        let startIndex = 0
        let allItems: B2BRole[] = []
        let totalCount = 0
        let hasMorePages = true

        // Fetch all pages if needed
        while (hasMorePages) {
          const variables = {
            accountId,
            startIndex,
            pageSize,
          }

          const response = await fetcher(
            { query: getRolesByAccountIdAsyncQuery, variables },
            { userClaims, headers }
          )

          const roles = response.data?.getRolesByAccountIdAsync

          if (roles?.items) {
            allItems = [...allItems, ...roles.items]
          }

          totalCount = roles?.totalCount || 0

          // Check if we need to fetch more pages
          if (roles?.items?.length === pageSize && allItems.length < totalCount) {
            startIndex += pageSize
          } else {
            hasMorePages = false
          }
        }

        return {
          accountId,
          roles: {
            totalCount,
            items: allItems,
            pageCount: Math.ceil(totalCount / pageSize),
            pageSize,
            startIndex: 0,
          },
        }
      } catch (error) {
        console.error(`Error fetching roles for account ${accountId}:`, error)
        return {
          accountId,
          roles: { totalCount: 0, items: [], pageCount: 0, pageSize: 200, startIndex: 0 },
        }
      }
    })

    const results = await Promise.all(rolesPromises)

    // Transform into a map of accountId -> roles, excluding accounts with totalCount = 0
    const accountRolesMap: AccountRolesMap = {}
    results.forEach(({ accountId, roles }) => {
      if (roles.totalCount > 0) {
        accountRolesMap[accountId] = roles
      }
    })

    return accountRolesMap
  } catch (error) {
    console.error('Error fetching roles across accounts:', error)
    return {}
  }
}
