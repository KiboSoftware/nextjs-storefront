[next-storefront](../README.md) / useOrderSubscriptionNow

# Module: useOrderSubscriptionNow

## Table of contents

### Functions

- [useOrderSubscriptionNow](useOrderSubscriptionNow.md#useordersubscriptionnow)

## Functions

### useOrderSubscriptionNow

▸ **useOrderSubscriptionNow**(): `Object`

[Mutation hook] useOrderSubscriptionNow uses the graphQL mutation

<b>orderSubscriptionNow(subscriptionId: String! ): Subscription</b>

Description : Order a subscription for a product

Parameters passed to function orderSubscriptionNowMutation(props: OrderSubscriptionNowInputParams) => expects object of type 'OrderSubscriptionNowInputParams' containing subscriptionId

On success, calls invalidateQueries on subscriptionKeys and fetches the updated result.

#### Returns

`Object`

'response?.orderSubscriptionNow' which contains object of Subscription

| Name                   | Type                                                                                 |
| :--------------------- | :----------------------------------------------------------------------------------- |
| `orderSubscriptionNow` | `UseMutationResult`<`any`, `unknown`, `OrderSubscriptionNowInputParams`, `unknown`\> |

#### Defined in

[mutations/subscription/useOrderSubscriptionNow/useOrderSubscriptionNow.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/subscription/useOrderSubscriptionNow/useOrderSubscriptionNow.ts#L44)
