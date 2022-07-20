/* eslint-disable import/no-named-as-default */

const getSearchSuggestionsQuery = /* GraphQL */ `
  query getSearchSuggestions($query: String!) {
    suggestionSearch(query: $query, groups: "pages,categories") {
      suggestionGroups {
        name
        suggestions {
          suggestion
        }
      }
    }
  }
`

export default getSearchSuggestionsQuery
