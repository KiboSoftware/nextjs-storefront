[next-storefront](../README.md) / [Exports](../modules.md) / queries/useReturnReasonsQueries/useReturnReasonsQueries

# Module: queries/useReturnReasonsQueries/useReturnReasonsQueries

## Table of contents

### Functions

- [useReturnReasonsQueries](queries_useReturnReasonsQueries_useReturnReasonsQueries.md#usereturnreasonsqueries)

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

[queries/useReturnReasonsQueries/useReturnReasonsQueries.ts:41](https://github.com/KiboSoftware/nextjs-storefront/blob/a6cbcc7/hooks/queries/useReturnReasonsQueries/useReturnReasonsQueries.ts#L41)
