[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateCustomerCards

# Module: mutation_useUpdateCustomerCards

## Table of contents

### Functions

- [useUpdateCustomerCardsMutation](mutation_useUpdateCustomerCards.md#useupdatecustomercardsmutation)

## Functions

### useUpdateCustomerCardsMutation

▸ **useUpdateCustomerCardsMutation**(): `Object`

[Mutation hook] useUpdateCustomerCardsMutation uses the graphQL mutation

<b>updateCustomerAccountCard(accountId: Int!, cardId: String!, cardInput: CardInput): Card</b>

Description : Update the existing customer's card information saved into the account.

Parameters passed to internal function updateCustomerAccountCardDetails(params: UpdateCustomerAccountCardDetailsParams) => expects object of type UpdateCustomerAccountCardDetailsParams containing accountId, cardId and cardInput.

On success, calls invalidateQueries all customerAccountCardsKeys and fetches the updated result.

#### Returns

`Object`

'response?.updateCustomerAccountCard', which has updated customer's card details like nameOnCard, cardType, contactId etc.

| Name                     | Type                                                                                        |
| :----------------------- | :------------------------------------------------------------------------------------------ |
| `updateSavedCardDetails` | `UseMutationResult`<`any`, `unknown`, `UpdateCustomerAccountCardDetailsParams`, `unknown`\> |

#### Defined in

[mutations/useCustomerCardsMutations/useUpdateCustomerCardsMutation.ts:43](https://github.com/KiboSoftware/nextjs-storefront/blob/98414f4/hooks/mutations/useCustomerCardsMutations/useUpdateCustomerCardsMutation.ts#L43)
