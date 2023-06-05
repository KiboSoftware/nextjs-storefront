[next-storefront](../README.md) / useGetProducts

# Module: useGetProducts

## Table of contents

### Functions

- [useGetProducts](useGetProducts.md#usegetproducts)

## Functions

### useGetProducts

▸ **useGetProducts**(`productCodes`): `UseProductsResponse`

[Query hook] useGetProducts uses the graphQL query

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

[queries/product/useGetProducts/useGetProducts.ts:50](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/product/useGetProducts/useGetProducts.ts#L50)
