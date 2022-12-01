[next-storefront](../README.md) / [Exports](../modules.md) / query_useSearchSuggestions

# Module: query_useSearchSuggestions

## Table of contents

### Functions

- [useSearchSuggestionsQueries](query_useSearchSuggestions.md#usesearchsuggestionsqueries)

## Functions

### useSearchSuggestionsQueries

▸ **useSearchSuggestionsQueries**(`searchTerm`): `SearchSuggestionResultType`

[Query hook] useSearchSuggestionsQueries uses the graphQL query

<b>suggestionSearch(query: String, groups: String, pageSize: Int, mid: String, filter: String): SearchSuggestionResult</b>

Description : Fetches the search suggestions based on search keyword.
User search by any keyword on header's search bar, and result of search suggestion displayed on popover.

Parameters passed to function getSearchSuggestionResult(searchTerm: string) => expects searchTerm

On success, returns the received search suggestions.

#### Parameters

| Name         | Type     | Description                                              |
| :----------- | :------- | :------------------------------------------------------- |
| `searchTerm` | `string` | Expect user entered search keyword to search the result. |

#### Returns

`SearchSuggestionResultType`

'response.suggestionSearch', which contains the search suggestions based on search request.

#### Defined in

[queries/useSearchSuggestionsQueries/useSearchSuggestionsQueries.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/queries/useSearchSuggestionsQueries/useSearchSuggestionsQueries.ts#L47)
