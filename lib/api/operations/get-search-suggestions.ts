import { fetcher } from '@/lib/api/util'
import { getSearchSuggestionsQuery } from '@/lib/gql/queries/get-search-suggestions'

export default async function getSearchSuggestions(searchKey: string) {
  try {
    const variables = {
      searchKey,
    }
    const response = await fetcher({ query: getSearchSuggestionsQuery, variables })
    return response.data?.suggestionGroups
  } catch (error) {
    console.error(error)
  }
}
