[next-storefront](../README.md) / useGetReturnReasons

# Module: useGetReturnReasons

## Table of contents

### Functions

- [useGetReturnReasons](useGetReturnReasons.md#usereturnreasonsqueries)

## Functions

### useGetReturnReasons

▸ **useGetReturnReasons**(): `UseReturnReasonsResponse`

[Query hook] useGetReturnReasons uses the graphQL query

<b>returnReasons: ReasonCollection</b>

Description : Fetches the return reasons to be diplayed in dropdown menu. E.g; Damaged, defective, missing or late

Parameters passed to function getReturnReasons()

On success, returns with return reasons list and 'refetchOnWindowFocus' set to false for this react query

#### Returns

`UseReturnReasonsResponse`

'response?.returnReasons?.items', which contains list of return reason listed.

#### Defined in

[queries/useGetReturnReasons/useGetReturnReasons.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useGetReturnReasons/useGetReturnReasons.ts#L44)
