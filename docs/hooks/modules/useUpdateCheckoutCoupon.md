[next-storefront](../README.md) / useUpdateCheckoutCoupon

# Module: useUpdateCheckoutCoupon

## Table of contents

### Functions

- [useUpdateCheckoutCoupon](useUpdateCheckoutCoupon.md#useupdatecheckoutcoupon)

## Functions

### useUpdateCheckoutCoupon

▸ **useUpdateCheckoutCoupon**(): `UseMutationResult`<`any`, `unknown`, `UpdateCheckoutCouponParams`, `unknown`\>

[Mutation hook] useUpdateCheckoutCoupon uses the graphQL mutation

<b>updateCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>

Description : Applies or updates the coupon to the checkout page.

Parameters passed to function updateCheckoutCoupon(params: UpdateCheckoutCouponParams) => expects checkoutId and couponCode

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateCheckoutCouponParams`, `unknown`\>

'response?.updateCheckoutCoupon' which applies the coupon on checkout page(if coupon is valid)

#### Defined in

[mutations/multishipCheckout/useUpdateCheckoutCoupon/useUpdateCheckoutCoupon.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useUpdateCheckoutCoupon/useUpdateCheckoutCoupon.ts#L40)
