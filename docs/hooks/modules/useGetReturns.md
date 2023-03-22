[next-storefront](../README.md) / useGetReturns

# Module: useGetReturns

## Table of contents

### Functions

- [useGetReturns](useGetReturns.md#usegetreturns)

## Functions

### useGetReturns

▸ **useGetReturns**(`searchParams`): `UseReturnsResponse`

[Query hook] useGetReturns uses the graphQL query

<b>returns(startIndex: Int, pageSize: Int, sortBy: String, filter: String, q: String): ReturnCollection</b>

Description : Fetches the list of items returned with reasons and return type.

Parameters passed to function getReturns(param: { filter: string }) => can be used to filter out the results for return items

On success, returns items that are returned and 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchParams` | `Object` | can be used to filter out the results |
| `searchParams.filter` | `string` | - |

#### Returns

`UseReturnsResponse`

'response?.returns', which contains list of items returned

#### Defined in

[queries/returns/useGetReturns/useGetReturns.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/queries/returns/useGetReturns/useGetReturns.ts#L48)
