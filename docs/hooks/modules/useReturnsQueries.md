[next-storefront](../README.md) / useReturnsQueries

# Module: useReturnsQueries

## Table of contents

### Functions

- [useReturnsQueries](useReturnsQueries.md#usereturnsqueries)

## Functions

### useReturnsQueries

▸ **useReturnsQueries**(`searchParams`): `UseReturnsResponse`

[Query hook] useReturnsQueries uses the graphQL query

<b>returns(startIndex: Int, pageSize: Int, sortBy: String, filter: String, q: String): ReturnCollection</b>

Description : Fetches the list of items returned with reasons and return type.

Parameters passed to function getReturns(param: { filter: string }) => can be used to filter out the results for return items

On success, returns items that are returned and 'refetchOnWindowFocus' set to false for this react query

#### Parameters

| Name                  | Type     | Description                           |
| :-------------------- | :------- | :------------------------------------ |
| `searchParams`        | `Object` | can be used to filter out the results |
| `searchParams.filter` | `string` | -                                     |

#### Returns

`UseReturnsResponse`

'response?.returns', which contains list of items returned

#### Defined in

[queries/useReturnsQueries/useReturnsQueries.ts:48](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useReturnsQueries/useReturnsQueries.ts#L48)
