[next-storefront](../README.md) / useUpdateSubscriptionFrequency

# Module: useUpdateSubscriptionFrequency

## Table of contents

### Functions

- [useUpdateSubscriptionFrequency](useUpdateSubscriptionFrequency.md#useupdatesubscriptionfrequency)

## Functions

### useUpdateSubscriptionFrequency

▸ **useUpdateSubscriptionFrequency**(): `Object`

[Mutation hook] useUpdateSubscriptionFrequency uses the graphQL mutation

<b>updateSubscriptionFrequency(subscriptionId: String! frequencyInput: SBFrequencyInput): Subscription</b>

Description : Updates Subscription Frequency

Parameters passed to function editSubscriptionFrequency(props: EditSubscriptionFrequencyProps) => expects object of type 'EditSubscriptionFrequencyProps' containing subscriptionId and frequencyInput

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response.subscription.frequency', which returns updated Subscription Frequency

| Name | Type |
| :------ | :------ |
| `updateSubscriptionFrequency` | `UseMutationResult`<`any`, `unknown`, `EditSubscriptionFrequencyProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useUpdateSubscriptionFrequency/useUpdateSubscriptionFrequency.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useUpdateSubscriptionFrequency/useUpdateSubscriptionFrequency.ts#L42)
