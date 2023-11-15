import { NextApiRequest } from 'next'

import { getAdditionalHeader } from '../util'
import { getSellerTenantInfo } from '../util/seller'
import { fetcher } from '@/lib/api/util'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries'

export default async function getSearchSuggestions(searchKey: string, req: NextApiRequest) {
  try {
    const variables = {
      searchKey,
    }
    const headers = req ? getAdditionalHeader(req) : {}
    const response = await fetcher(
      { query: getSearchSuggestionsQuery, variables },
      { headers },
      getSellerTenantInfo(req)
    )
    return response.data?.suggestionGroups
  } catch (error) {
    console.error(error)
  }
}
