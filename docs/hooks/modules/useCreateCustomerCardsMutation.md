[next-storefront](../README.md) / useCreateCustomerCardsMutation

# Module: useCreateCustomerCardsMutation

## Table of contents

### Functions

- [useCreateCustomerCardsMutation](useCreateCustomerCardsMutation.md#usecreatecustomercardsmutation)

## Functions

### useCreateCustomerCardsMutation

▸ **useCreateCustomerCardsMutation**(): `Object`

[Mutation hook] useCreateCustomerCardsMutation uses the graphQL mutation

<b>createCustomerAccountCard(accountId: Int!, cardInput: CardInput): Card</b>

Description : Save the customer's card details to the account which can be used at the time of checkout for payment.

Parameters passed to internal function addCustomerAccountCardDetails(params: AddCustomerAccountCardDetailsParams) => expects object of type AddCustomerAccountCardDetailsParams containing accountId and cardInput.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.createCustomerAccountCard', which has customer's card details like nameOnCard, cardType, contactId etc.

| Name                  | Type                                                                                     |
| :-------------------- | :--------------------------------------------------------------------------------------- |
| `addSavedCardDetails` | `UseMutationResult`<`any`, `unknown`, `AddCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/useCustomerCardsMutations/useCreateCustomerCardsMutation.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCustomerCardsMutations/useCreateCustomerCardsMutation.ts#L42)
