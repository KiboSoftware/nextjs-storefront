import { fetcher } from '@/lib/api/util'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries'

export default async function getSearchSuggestions(searchKey: string) {
  try {
    const variables = {
      searchKey,
    }
    const response = await fetcher({ query: getSearchSuggestionsQuery, variables }, null)
    return response.data?.suggestionGroups
  } catch (error) {
    console.error(error)
  }
}
