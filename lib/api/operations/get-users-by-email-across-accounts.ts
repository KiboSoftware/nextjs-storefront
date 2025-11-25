import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getCustomerB2BAccountUsersQuery } from '@/lib/gql/queries'

import { B2BUser, B2BUserCollection } from '@/lib/gql/types'

export interface AccountUsersMap {
  [accountId: number]: B2BUserCollection
}

/**
 * Fetch users by email across multiple accounts in parallel
 * Handles pagination if results exceed page size
 */
export default async function getUsersByEmailAcrossAccounts(
  req: NextApiRequest,
  res: NextApiResponse,
  accountIds: number[],
  emailAddress: string
): Promise<AccountUsersMap> {
  if (!accountIds.length || !emailAddress) {
    return {}
  }

  try {
    const userClaims = await getUserClaimsFromRequest(req, res)
    const headers = getAdditionalHeader(req)

    // Fetch users for each account in parallel
    const usersPromises = accountIds.map(async (accountId) => {
      const pageSize = 20

      try {
        let startIndex = 0
        let allItems: B2BUser[] = []
        let totalCount = 0
        let hasMorePages = true

        // Fetch all pages if needed
        while (hasMorePages) {
          const variables = {
            b2bAccountId: accountId,
            filter: `emailAddress eq '${emailAddress}'`,
            startIndex,
            pageSize,
          }

          const response = await fetcher(
            { query: getCustomerB2BAccountUsersQuery, variables },
            { userClaims, headers }
          )

          const users = response.data?.b2bAccountUsers

          if (users?.items) {
            allItems = [...allItems, ...users.items]
          }

          totalCount = users?.totalCount || 0

          // Check if we need to fetch more pages
          if (users?.items?.length === pageSize && allItems.length < totalCount) {
            startIndex += pageSize
          } else {
            hasMorePages = false
          }
        }

        return {
          accountId,
          users: {
            totalCount,
            items: allItems,
            pageCount: Math.ceil(totalCount / pageSize),
            pageSize,
            startIndex: 0,
          },
        }
      } catch (error) {
        console.error(`Error fetching users for account ${accountId}:`, error)
        return {
          accountId,
          users: { totalCount: 0, items: [], pageCount: 0, pageSize, startIndex: 0 },
        }
      }
    })

    const results = await Promise.all(usersPromises)

    // Transform into a map of accountId -> users, excluding accounts with totalCount = 0
    const accountUsersMap: AccountUsersMap = {}
    results.forEach(({ accountId, users }) => {
      if (users.totalCount > 0) {
        accountUsersMap[accountId] = users
      }
    })

    return accountUsersMap
  } catch (error) {
    console.error(`Error fetching users with email ${emailAddress}:`, error)
    return {}
  }
}
