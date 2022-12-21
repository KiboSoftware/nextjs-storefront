[next-storefront](../README.md) / useProductSearchQueries

# Module: useProductSearchQueries

## Table of contents

### Functions

- [useProductSearchQueries](useProductSearchQueries.md#useproductsearchqueries)

## Functions

### useProductSearchQueries

▸ **useProductSearchQueries**(`searchParams`, `initialData?`): `UseProductSearchResponse`

[Query hook] useProductSearchQueries uses the graphQL query

<b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>

Description : Fetches the product details based on search keyword passing by searchParams.

Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects object of type CategorySearchParams containing categoryCode, pageSize, filters, startIndex, sort, search, filter.

On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name           | Type                   | Description                                                                                                                  |
| :------------- | :--------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `searchParams` | `CategorySearchParams` | get required values from route.query and used inside the search params                                                       |
| `initialData?` | `ProductSearchResult`  | stores the data for cart present on server side. Used to check if the data has got stale, if not; data is not fetched again. |

#### Returns

`UseProductSearchResponse`

'response?.products', which contains list of products based of search request.

#### Defined in

[queries/useProductSearchQueries/useProductSearchQueries.ts:51](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useProductSearchQueries/useProductSearchQueries.ts#L51)
