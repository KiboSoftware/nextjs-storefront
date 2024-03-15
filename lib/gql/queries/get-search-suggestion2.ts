/* eslint-disable import/no-named-as-default */

const getSearchSuggestion2Query = /* GraphQL */ `
  query getSearchSuggestion2($query: String!) {
    suggestionSearch2(query: $query, groups: "products,categories") {
      suggestionGroups {
        name
        suggestions {
          suggestion
        }
      }
    }
  }
`

export default getSearchSuggestion2Query
