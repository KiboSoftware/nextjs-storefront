[next-storefront](../README.md) / useDeleteCustomerCardsMutation

# Module: useDeleteCustomerCardsMutation

## Table of contents

### Functions

- [useDeleteCustomerCardsMutation](useDeleteCustomerCardsMutation.md#usedeletecustomercardsmutation)

## Functions

### useDeleteCustomerCardsMutation

▸ **useDeleteCustomerCardsMutation**(): `Object`

[Mutation hook] useDeleteCustomerCardsMutation uses the graphQL mutation

<b>deleteCustomerAccountCard(accountId: Int!, cardId: Int!): Boolean</b>

Description : Delete the customer's card details saved on their account

Parameters passed to internal function deleteCustomerAccountCardDetails(params: DeleteCustomerAccountCardDetailsParams) => expects object of type DeleteCustomerAccountCardDetailsParams containing accountId and cardId.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.deleteCustomerAccountCard', which contains True/False value to identify if customer's card has been deleted or not.

| Name                     | Type                                                                                        |
| :----------------------- | :------------------------------------------------------------------------------------------ |
| `deleteSavedCardDetails` | `UseMutationResult`<`any`, `unknown`, `DeleteCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/useCustomerCardsMutations/useDeleteCustomerCardsMutation.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCustomerCardsMutations/useDeleteCustomerCardsMutation.ts#L40)
