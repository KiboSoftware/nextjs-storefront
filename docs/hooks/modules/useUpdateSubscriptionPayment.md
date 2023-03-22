[next-storefront](../README.md) / useUpdateSubscriptionPayment

# Module: useUpdateSubscriptionPayment

## Table of contents

### Functions

- [useUpdateSubscriptionPayment](useUpdateSubscriptionPayment.md#useupdatesubscriptionpayment)

## Functions

### useUpdateSubscriptionPayment

▸ **useUpdateSubscriptionPayment**(): `Object`

[Mutation hook] useUpdateSubscriptionPayment uses the graphQL mutation

<b>updateSubscriptionPayment(subscriptionId: String!  paymentInput: SbPaymentInput ): Subscription</b>

Description : Updates Subscription Payment

Parameters passed to function updateSubscriptionPayment(props: UpdateSubscriptionPaymentProps) => expects object of type 'UpdateSubscriptionPaymentProps' containing subscriptionId and paymentInput

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response.subscription', which returns updated Subscription

| Name | Type |
| :------ | :------ |
| `updateSubscriptionPayment` | `UseMutationResult`<`any`, `unknown`, `UpdateSubscriptionPaymentProps`, `unknown`\> |

#### Defined in

[mutations/subscription/useUpdateSubscriptionPayment/useUpdateSubscriptionPayment.ts:42](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useUpdateSubscriptionPayment/useUpdateSubscriptionPayment.ts#L42)
