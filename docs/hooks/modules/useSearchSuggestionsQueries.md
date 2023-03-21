[next-storefront](../README.md) / useGetSearchSuggestions

# Module: useGetSearchSuggestions

## Table of contents

### Functions

- [useGetSearchSuggestions](useGetSearchSuggestions.md#usesearchsuggestionsqueries)

## Functions

### useGetSearchSuggestions

▸ **useGetSearchSuggestions**(`searchTerm`): `SearchSuggestionResultType`

[Query hook] useGetSearchSuggestions uses the graphQL query

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

[queries/useGetSearchSuggestions/useGetSearchSuggestions.ts:47](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetSearchSuggestions/useGetSearchSuggestions.ts#L47)
