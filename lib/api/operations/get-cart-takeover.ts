import { NextApiRequest } from 'next'

import { fetcher, getAdditionalHeader } from '@/lib/api/util'
import { getOneTimeSecretQuery as query } from '@/lib/gql/queries'

export default async function getCartTakeover(secretId: string, req: NextApiRequest) {
  const headers = req ? getAdditionalHeader(req) : {}
  const variables = {
    secretId,
  }
  const response = await fetcher({ query, variables }, { headers })
  return response
}
