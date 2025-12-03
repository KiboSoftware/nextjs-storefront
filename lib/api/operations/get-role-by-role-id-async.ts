import { NextApiRequest, NextApiResponse } from 'next'

import { fetcher, getAdditionalHeader, getUserClaimsFromRequest } from '@/lib/api/util'
import { getRoleByRoleIdAsyncQuery as query } from '@/lib/gql/queries'

export interface B2BRole {
  id?: number
  name?: string
  isSystemRole?: boolean
  behaviors?: number[]
  accountIds?: number[]
}

export default async function getRoleByRoleIdAsync(
  req: NextApiRequest,
  res: NextApiResponse,
  roleId: number
): Promise<B2BRole | null> {
  const variables = {
    roleId,
  }

  const userClaims = await getUserClaimsFromRequest(req, res)
  const headers = getAdditionalHeader(req)
  const response = await fetcher({ query, variables }, { userClaims, headers })

  return response.data?.getRoleByRoleIdAsync || null
}
