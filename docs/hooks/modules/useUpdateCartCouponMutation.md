[next-storefront](../README.md) / useUpdateCartCouponMutation

# Module: useUpdateCartCouponMutation

## Table of contents

### Functions

- [useUpdateCartCouponMutation](useUpdateCartCouponMutation.md#useupdatecartcouponmutation)

## Functions

### useUpdateCartCouponMutation

▸ **useUpdateCartCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `UpdateCartCouponParams`, `unknown`\>

[Mutation hook] useUpdateCartCouponMutation uses the graphQL mutation

<b>updateCartCoupon(cartId: String!, couponCode: String!): Cart</b>

Description : Applies promo code in Order Summary of cart page

Parameters passed to function updateCartCoupon(params: UpdateCartCouponParams) => expects object of type 'UpdateCartCouponParams' containing cartId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateCartCouponParams`, `unknown`\>

'response?.updateCartCoupon' which applies the coupon on cart page(if coupon is valid)

#### Defined in

[mutations/useCouponMutations/useUpdateCartCouponMutation/useUpdateCartCouponMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCouponMutations/useUpdateCartCouponMutation/useUpdateCartCouponMutation.ts#L44)
