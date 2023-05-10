[next-storefront](../README.md) / useDeleteCheckoutCoupon

# Module: useDeleteCheckoutCoupon

## Table of contents

### Functions

- [useDeleteCheckoutCoupon](useDeleteCheckoutCoupon.md#usedeletecheckoutcoupon)

## Functions

### useDeleteCheckoutCoupon

▸ **useDeleteCheckoutCoupon**(): `UseMutationResult`<`any`, `unknown`, `DeleteCheckoutCouponParams`, `unknown`\>

[Mutation hook] useDeleteCheckoutCoupon uses the graphQL mutation

<b>deleteCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>

Description : Removes the coupons that had been applied to the checkout.

Parameters passed to function deleteCheckoutCoupon(params: DeleteCheckoutCouponParams) => expects checkoutId and couponCode

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCheckoutCouponParams`, `unknown`\>

'response?.deleteCheckoutCoupon' which removes the applied coupon on checkout page

#### Defined in

[mutations/multishipCheckout/useDeleteCheckoutCoupon/useDeleteCheckoutCoupon.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/multishipCheckout/useDeleteCheckoutCoupon/useDeleteCheckoutCoupon.ts#L40)
