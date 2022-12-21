[next-storefront](../README.md) / useCreateOrderReturnItemsMutation

# Module: useCreateOrderReturnItemsMutation

## Table of contents

### Functions

- [useCreateOrderReturnItemsMutation](useCreateOrderReturnItemsMutation.md#usecreateorderreturnitemsmutation)

## Functions

### useCreateOrderReturnItemsMutation

▸ **useCreateOrderReturnItemsMutation**(): `Object`

[Mutation hook] useCreateOrderReturnItemsMutation uses the graphQL mutation

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

[mutations/useCreateOrderReturnItemsMutation/useCreateOrderReturnItemsMutation.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCreateOrderReturnItemsMutation/useCreateOrderReturnItemsMutation.ts#L45)
