[next-storefront](../README.md) / useReturnReasonsQueries

# Module: useReturnReasonsQueries

## Table of contents

### Functions

- [useReturnReasonsQueries](useReturnReasonsQueries.md#usereturnreasonsqueries)

## Functions

### useReturnReasonsQueries

▸ **useReturnReasonsQueries**(): `UseReturnReasonsResponse`

[Query hook] useReturnReasonsQueries uses the graphQL query

<b>returnReasons: ReasonCollection</b>

Description : Fetches the return reasons to be diplayed in dropdown menu. E.g; Damaged, defective, missing or late

Parameters passed to function getReturnReasons()

On success, returns with return reasons list and 'refetchOnWindowFocus' set to false for this react query

#### Returns

`UseReturnReasonsResponse`

'response?.returnReasons?.items', which contains list of return reason listed.

#### Defined in

[queries/useReturnReasonsQueries/useReturnReasonsQueries.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useReturnReasonsQueries/useReturnReasonsQueries.ts#L44)
