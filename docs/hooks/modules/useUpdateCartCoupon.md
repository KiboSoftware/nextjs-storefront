[next-storefront](../README.md) / useUpdateCartCoupon

# Module: useUpdateCartCoupon

## Table of contents

### Functions

- [useUpdateCartCoupon](useUpdateCartCoupon.md#useupdatecartcoupon)

## Functions

### useUpdateCartCoupon

▸ **useUpdateCartCoupon**(): `UseMutationResult`<`any`, `unknown`, `UpdateCartCouponParams`, `unknown`\>

[Mutation hook] useUpdateCartCoupon uses the graphQL mutation

<b>updateCartCoupon(cartId: String!, couponCode: String!): Cart</b>

Description : Applies promo code in Order Summary of cart page

Parameters passed to function updateCartCoupon(params: UpdateCartCouponParams) => expects object of type 'UpdateCartCouponParams' containing cartId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateCartCouponParams`, `unknown`\>

'response?.updateCartCoupon' which applies the coupon on cart page(if coupon is valid)

#### Defined in

[mutations/cart/useUpdateCartCoupon/useUpdateCartCoupon.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/cart/useUpdateCartCoupon/useUpdateCartCoupon.ts#L44)
