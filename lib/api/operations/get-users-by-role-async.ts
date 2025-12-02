import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getUsersByRoleAsyncQuery as query } from '@/lib/gql/queries'

export interface UserRole {
  roleId?: number
  roleName?: string
  roleTags?: string[]
}

export interface B2BUserByRole {
  emailAddress?: string
  userName?: string
  firstName?: string
  lastName?: string
  localeCode?: string
  userId?: string
  roles?: UserRole[]
  isLocked?: boolean
  isActive?: boolean
  isRemoved?: boolean
  acceptsMarketing?: boolean
  hasExternalPassword?: boolean
}

export default async function getUsersByRoleAsync(
  req: NextApiRequest,
  res: NextApiResponse,
  accountId: number,
  roleId: number
): Promise<B2BUserByRole[] | null> {
  const variables = {
    accountId,
    roleId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)
  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.getUsersByRoleAsync || []
}
