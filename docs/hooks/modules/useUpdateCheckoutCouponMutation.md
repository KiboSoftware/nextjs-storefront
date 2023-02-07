[next-storefront](../README.md) / useUpdateCheckoutCouponMutation

# Module: useUpdateCheckoutCouponMutation

## Table of contents

### Functions

- [useUpdateCheckoutCouponMutation](useUpdateCheckoutCouponMutation.md#useupdatecheckoutcouponmutation)

## Functions

### useUpdateCheckoutCouponMutation

▸ **useUpdateCheckoutCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `UpdateCheckoutCouponParams`, `unknown`\>

[Mutation hook] useUpdateCheckoutCouponMutation uses the graphQL mutation

<b>updateCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>

Description : Applies or updates the coupon to the checkout page.

Parameters passed to function updateCheckoutCoupon(params: UpdateCheckoutCouponParams) => expects checkoutId and couponCode

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateCheckoutCouponParams`, `unknown`\>

'response?.updateCheckoutCoupon' which applies the coupon on checkout page(if coupon is valid)

#### Defined in

[mutations/multiShip/useUpdateCheckoutCouponMutation/useUpdateCheckoutCouponMutation.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useUpdateCheckoutCouponMutation/useUpdateCheckoutCouponMutation.ts#L40)
