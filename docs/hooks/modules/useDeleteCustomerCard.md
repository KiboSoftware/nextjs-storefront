[next-storefront](../README.md) / useDeleteCustomerCard

# Module: useDeleteCustomerCard

## Table of contents

### Functions

- [useDeleteCustomerCard](useDeleteCustomerCard.md#usedeletecustomercard)

## Functions

### useDeleteCustomerCard

▸ **useDeleteCustomerCard**(): `Object`

[Mutation hook] useDeleteCustomerCard uses the graphQL mutation

<b>deleteCustomerAccountCard(accountId: Int!, cardId: Int!): Boolean</b>

Description : Delete the customer's card details saved on their account

Parameters passed to internal function deleteCustomerAccountCardDetails(params: DeleteCustomerAccountCardDetailsParams) => expects object of type DeleteCustomerAccountCardDetailsParams containing accountId and cardId.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.deleteCustomerAccountCard', which contains True/False value to identify if customer's card has been deleted or not.

| Name                 | Type                                                                                        |
| :------------------- | :------------------------------------------------------------------------------------------ |
| `deleteCustomerCard` | `UseMutationResult`<`any`, `unknown`, `DeleteCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/card/delete/useDeleteCustomerCard.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/card/delete/useDeleteCustomerCard.ts#L40)
