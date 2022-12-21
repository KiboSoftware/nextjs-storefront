[next-storefront](../README.md) / useDeleteCartCouponMutation

# Module: useDeleteCartCouponMutation

## Table of contents

### Functions

- [useDeleteCartCouponMutation](useDeleteCartCouponMutation.md#usedeletecartcouponmutation)

## Functions

### useDeleteCartCouponMutation

▸ **useDeleteCartCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

[Mutation hook] useDeleteCartCouponMutation uses the graphQL mutation

<b>deleteCartCoupon(cartId: String!, couponCode: String!): Cart</b>

Description : Removes promo code from Order Summary in cart page

Parameters passed to function deleteCartCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing cartId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

'response?.deleteCartCoupon' which removes the applied coupon on cart page

#### Defined in

[mutations/useCouponMutations/useDeleteCartCouponMutation/useDeleteCartCouponMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/561a164/hooks/mutations/useCouponMutations/useDeleteCartCouponMutation/useDeleteCartCouponMutation.ts#L44)
