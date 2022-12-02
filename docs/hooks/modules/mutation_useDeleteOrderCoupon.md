[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useDeleteOrderCoupon

# Module: mutation_useDeleteOrderCoupon

## Table of contents

### Functions

- [useDeleteOrderCouponMutation](mutation_useDeleteOrderCoupon.md#usedeleteordercouponmutation)

## Functions

### useDeleteOrderCouponMutation

▸ **useDeleteOrderCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

[Mutation hook] useDeleteOrderCouponMutation uses the graphQL mutation

<b>deleteOrderCoupons(orderId: String!, updateMode: String, version: String): Order</b>

Description : Removes promo code from Order Summary in checkout pages

Parameters passed to function deleteOrderCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing checkoutId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

'response?.deleteOrderCoupon' which removes the applied coupon on checkout page

#### Defined in

[mutations/useCouponMutations/useDeleteOrderCouponMutation/useDeleteOrderCouponMutation.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/98414f4/hooks/mutations/useCouponMutations/useDeleteOrderCouponMutation/useDeleteOrderCouponMutation.ts#L44)
