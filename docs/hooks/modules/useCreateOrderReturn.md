[next-storefront](../README.md) / useCreateOrderReturn

# Module: useCreateOrderReturn

## Table of contents

### Functions

- [useCreateOrderReturn](useCreateOrderReturn.md#usecreateorderreturn)

## Functions

### useCreateOrderReturn

▸ **useCreateOrderReturn**(): `Object`

[Mutation hook] useCreateOrderReturn uses the graphQL mutation

<b>createReturn(returnObjInput: ReturnObjInput): ReturnObj</b>

Description : Creates a return order for placed order items. Orders to be returned can be managed in 'My Account section'.
Select the item to be returned with it's return reason from dropdown menu and returnType(refund or replace).

Parameters passed to function createOrderReturnItems(params: CreateOrderReturnItemsInputParams) => expects object containing returnType, reason, originalOrderId, items, locationCode

#### Returns

`Object`

'response?.createReturn' which places the return order containing return reasons and return type with items to be returned

| Name                | Type                                                                                   |
| :------------------ | :------------------------------------------------------------------------------------- |
| `createReturnItems` | `UseMutationResult`<`any`, `unknown`, `CreateOrderReturnItemsInputParams`, `unknown`\> |

#### Defined in

[mutations/returns/useCreateOrderReturn/useCreateOrderReturn.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/returns/useCreateOrderReturn/useCreateOrderReturn.ts#L45)
