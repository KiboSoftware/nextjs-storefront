[next-storefront](../README.md) / useCreateCustomerCard

# Module: useCreateCustomerCard

## Table of contents

### Functions

- [useCreateCustomerCard](useCreateCustomerCard.md#usecreatecustomercard)

## Functions

### useCreateCustomerCard

▸ **useCreateCustomerCard**(): `Object`

[Mutation hook] useCreateCustomerCard uses the graphQL mutation

<b>createCustomerAccountCard(accountId: Int!, cardInput: CardInput): Card</b>

Description : Save the customer's card details to the account which can be used at the time of checkout for payment.

Parameters passed to internal function addCustomerAccountCardDetails(params: AddCustomerAccountCardDetailsParams) => expects object of type AddCustomerAccountCardDetailsParams containing accountId and cardInput.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.createCustomerAccountCard', which has customer's card details like nameOnCard, cardType, contactId etc.

| Name | Type |
| :------ | :------ |
| `addSavedCardDetails` | `UseMutationResult`<`any`, `unknown`, `AddCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/card/create/useCreateCustomerCard.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/card/create/useCreateCustomerCard.ts#L42)
