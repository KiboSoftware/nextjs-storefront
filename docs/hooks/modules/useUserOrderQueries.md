[next-storefront](../README.md) / useUserOrderQueries

# Module: useUserOrderQueries

## Table of contents

### Functions

- [useUserOrderQueries](useUserOrderQueries.md#useuserorderqueries)

## Functions

### useUserOrderQueries

▸ **useUserOrderQueries**(`param`): `UseUserOrderType`

[Query hook] useUserOrderQueries uses the graphQL query

<b>orders(startIndex: Int, pageSize: Int, sortBy: String, filter: String): OrderCollection</b>

Description : Fetches the orders based on filter provided and non abandoned orders.

Parameters passed to function getOrders(params: UseUserOrder) => expects UseUserOrder containing filters or order number and billing email.

On success, returns the list of orders

#### Parameters

| Name    | Type           | Description                                                                                                                                 |
| :------ | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `param` | `UseUserOrder` | Accepts a UseUserOrder value as filters (duration like M-1, M-6, Y-2022 etc) or order number and billing email including status (ABANDONED) |

#### Returns

`UseUserOrderType`

'response?.orders', which contains orders list.

#### Defined in

[queries/useUserOrderQueries/useUserOrderQueries.ts:58](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/queries/useUserOrderQueries/useUserOrderQueries.ts#L58)
