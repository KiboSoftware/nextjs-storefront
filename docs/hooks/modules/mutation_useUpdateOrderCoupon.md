[next-storefront](../README.md) / [Exports](../modules.md) / mutation_useUpdateOrderCoupon

# Module: mutation_useUpdateOrderCoupon

## Table of contents

### Functions

- [useUpdateOrderCouponMutation](mutation_useUpdateOrderCoupon.md#useupdateordercouponmutation)

## Functions

### useUpdateOrderCouponMutation

▸ **useUpdateOrderCouponMutation**(): `UseMutationResult`<`any`, `unknown`, `UpdateOrderCouponParams`, `unknown`\>

[Mutation hook] useUpdateOrderCouponMutation uses the graphQL mutation

<b>updateOrderCoupon(orderId: String!, couponCode: String!, updateMode: String, version: String): Order</b>

Description : Applies promo code in Order Summary of checkout pages

Parameters passed to function updateOrderCoupon(params: UpdateOrderCouponParams) => expects object of type 'UpdateOrderCouponParams' containing checkoutId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateOrderCouponParams`, `unknown`\>

'response?.updateOrderCoupon' which applies the coupon on checkout page((if coupon is valid))

#### Defined in

[mutations/useCouponMutations/useUpdateOrderCouponMutation/useUpdateOrderCouponMutation.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/98414f4/hooks/mutations/useCouponMutations/useUpdateOrderCouponMutation/useUpdateOrderCouponMutation.ts#L45)
