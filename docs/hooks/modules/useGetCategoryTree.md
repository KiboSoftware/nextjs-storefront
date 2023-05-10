[next-storefront](../README.md) / useGetCategoryTree

# Module: useGetCategoryTree

## Table of contents

### Functions

- [useGetCategoryTree](useGetCategoryTree.md#usegetcategorytree)

## Functions

### useGetCategoryTree

▸ **useGetCategoryTree**(`initialData`): `UseCategoryResponse`

[Query hook] useGetCategoryTree fetches the data from the GET api call to the <b>/api/category-tree</b>

Description : Fetches categories and all related sub categories for the storefront

Parameters passed to function fetchCategoryTree()

On success, returns the category data items

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `initialData` | `Maybe`<`PrCategory`\>[] | stores the category data for the storefront present on server side. Used to check if the data has got stale, if not; cached data is returned. |

#### Returns

`UseCategoryResponse`

category and related children catagories

#### Defined in

[queries/category/useGetCategoryTree/useGetCategoryTree.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/category/useGetCategoryTree/useGetCategoryTree.ts#L40)
