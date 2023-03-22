[next-storefront](../README.md) / useDeleteCartCoupon

# Module: useDeleteCartCoupon

## Table of contents

### Functions

- [useDeleteCartCoupon](useDeleteCartCoupon.md#usedeletecartcoupon)

## Functions

### useDeleteCartCoupon

▸ **useDeleteCartCoupon**(): `UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

[Mutation hook] useDeleteCartCoupon uses the graphQL mutation

<b>deleteCartCoupon(cartId: String!, couponCode: String!): Cart</b>

Description : Removes promo code from Order Summary in cart page

Parameters passed to function deleteCartCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing cartId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

'response?.deleteCartCoupon' which removes the applied coupon on cart page

#### Defined in

[mutations/cart/useDeleteCartCoupon/useDeleteCartCoupon.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useDeleteCartCoupon/useDeleteCartCoupon.ts#L44)
