[next-storefront](../README.md) / useUpdateOrderCoupon

# Module: useUpdateOrderCoupon

## Table of contents

### Functions

- [useUpdateOrderCoupon](useUpdateOrderCoupon.md#useupdateordercoupon)

## Functions

### useUpdateOrderCoupon

▸ **useUpdateOrderCoupon**(): `UseMutationResult`<`any`, `unknown`, `UpdateOrderCouponParams`, `unknown`\>

[Mutation hook] useUpdateOrderCoupon uses the graphQL mutation

<b>updateOrderCoupon(orderId: String!, couponCode: String!, updateMode: String, version: String): Order</b>

Description : Applies promo code in Order Summary of checkout pages

Parameters passed to function updateOrderCoupon(params: UpdateOrderCouponParams) => expects object of type 'UpdateOrderCouponParams' containing checkoutId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated result

#### Returns

`UseMutationResult`<`any`, `unknown`, `UpdateOrderCouponParams`, `unknown`\>

'response?.updateOrderCoupon' which applies the coupon on checkout page((if coupon is valid))

#### Defined in

[mutations/standardCheckout/useUpdateOrderCoupon/useUpdateOrderCoupon.ts:45](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useUpdateOrderCoupon/useUpdateOrderCoupon.ts#L45)
