[next-storefront](../README.md) / [Exports](../modules.md) / query_useProducts

# Module: query_useProducts

## Table of contents

### Functions

- [useProductsQueries](query_useProducts.md#useproductsqueries)

## Functions

### useProductsQueries

▸ **useProductsQueries**(`productCodes`): `UseProductsResponse`

[Query hook] useProductsQueries uses the graphQL query

<b>ProductSearch(query: String, startIndex: Int, filter: String, pageSize: Int, sortBy: String, facet: String, facetHierValue: String, facetTemplate: String, facetValueFilter: String): ProductSearchResult</b>

Description : Fetches the product details based on filter and pagesize, here filter contains product codes.

Parameters passed to function fetchProductSearch(searchParams: CategorySearchParams) => expects object of type CategorySearchParams containing categoryCode, pageSize, filters, startIndex, sort, search, filter.

On success, returns the product list with 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name           | Type       | Description                                                                                         |
| :------------- | :--------- | :-------------------------------------------------------------------------------------------------- |
| `productCodes` | `string`[] | Accept array of product code and converting it to string with separated by 'or' to be used further. |

#### Returns

`UseProductsResponse`

'response?.products', which contains list of products based on search request.

#### Defined in

[queries/useProductsQueries/useProductsQueries.ts:50](https://github.com/KiboSoftware/nextjs-storefront/blob/a6cbcc7/hooks/queries/useProductsQueries/useProductsQueries.ts#L50)
