[next-storefront](../README.md) / useDeleteCheckoutCouponMutation

# Module: useDeleteCheckoutCouponMutation

## Table of contents

### Functions

- [useDeleteCheckoutCouponMutation](useDeleteCheckoutCouponMutation.md#usedeletecheckoutcouponmutation)

## Functions

### useDeleteCheckoutCouponMutation

▸ **useDeleteCheckoutCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `DeleteCheckoutCouponParams`, `unknown`\>

[Mutation hook] useDeleteCheckoutCouponMutation uses the graphQL mutation

<b>deleteCheckoutCoupon(checkoutId: String!, couponCode: String!): Checkout</b>

Description : Removes the coupons that had been applied to the checkout.

Parameters passed to function deleteCheckoutCoupon(params: DeleteCheckoutCouponParams) => expects checkoutId and couponCode

On success, calls invalidateQueries on checkoutKeys and fetches the updated result.

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCheckoutCouponParams`, `unknown`\>

'response?.deleteCheckoutCoupon' which removes the applied coupon on checkout page

#### Defined in

[mutations/multiShip/useDeleteCheckoutCouponMutation/useDeleteCheckoutCouponMutation.ts:40](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/multiShip/useDeleteCheckoutCouponMutation/useDeleteCheckoutCouponMutation.ts#L40)
