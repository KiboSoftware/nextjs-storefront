import { NextApiRequest } from 'next'

import { getAdditionalHeader } from '../util'
import { fetcher } from '@/lib/api/util'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries'

export default async function getSearchSuggestions(searchKey: string, req: NextApiRequest) {
  try {
    const variables = {
      searchKey,
    }
    const headers = req ? getAdditionalHeader(req) : {}
    const response = await fetcher({ query: getSearchSuggestionsQuery, variables }, { headers })
    return response.data?.suggestionGroups
  } catch (error) {
    console.error(error)
  }
}
