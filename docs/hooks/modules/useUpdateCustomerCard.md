[next-storefront](../README.md) / useUpdateCustomerCard

# Module: useUpdateCustomerCard

## Table of contents

### Functions

- [useUpdateCustomerCard](useUpdateCustomerCard.md#useupdatecustomercard)

## Functions

### useUpdateCustomerCard

▸ **useUpdateCustomerCard**(): `Object`

[Mutation hook] useUpdateCustomerCard uses the graphQL mutation

<b>updateCustomerAccountCard(accountId: Int!, cardId: String!, cardInput: CardInput): Card</b>

Description : Update the existing customer's card information saved into the account.

Parameters passed to internal function updateCustomerAccountCardDetails(params: UpdateCustomerAccountCardDetailsParams) => expects object of type UpdateCustomerAccountCardDetailsParams containing accountId, cardId and cardInput.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.updateCustomerAccountCard', which has updated customer's card details like nameOnCard, cardType, contactId etc.

| Name | Type |
| :------ | :------ |
| `updateSavedCardDetails` | `UseMutationResult`<`any`, `unknown`, `UpdateCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/card/update/useUpdateCustomerCard.ts:43](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/card/update/useUpdateCustomerCard.ts#L43)
