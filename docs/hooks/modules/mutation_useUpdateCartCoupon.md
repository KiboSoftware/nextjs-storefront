[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateCartCoupon

# Module: mutation_useUpdateCartCoupon

## Table of contents

### Functions

- [useUpdateCartCouponMutation](mutation_useUpdateCartCoupon.md#useupdatecartcouponmutation)

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

[mutations/useCouponMutations/useUpdateCartCouponMutation/useUpdateCartCouponMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/2f9709d/hooks/mutations/useCouponMutations/useUpdateCartCouponMutation/useUpdateCartCouponMutation.ts#L44)
