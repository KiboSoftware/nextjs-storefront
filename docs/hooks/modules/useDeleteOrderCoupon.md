[next-storefront](../README.md) / useDeleteOrderCoupon

# Module: useDeleteOrderCoupon

## Table of contents

### Functions

- [useDeleteOrderCoupon](useDeleteOrderCoupon.md#usedeleteordercoupon)

## Functions

### useDeleteOrderCoupon

▸ **useDeleteOrderCoupon**(): `UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

[Mutation hook] useDeleteOrderCoupon uses the graphQL mutation

<b>deleteOrderCoupons(orderId: String!, updateMode: String, version: String): Order</b>

Description : Removes promo code from Order Summary in checkout pages

Parameters passed to function deleteOrderCoupon(params: DeleteCartCouponParams) => expects object of type 'DeleteCartCouponParams' containing checkoutId and couponCode

On success, calls invalidateQueries on cartKeys and fetches the updated

#### Returns

`UseMutationResult`<`any`, `unknown`, `DeleteCartCouponParams`, `unknown`\>

'response?.deleteOrderCoupon' which removes the applied coupon on checkout page

#### Defined in

[mutations/standardCheckout/useDeleteOrderCoupon/useDeleteOrderCoupon.ts:44](https://github.com/KiboSoftware/nextjs-storefront/blob/474c22ea/hooks/mutations/standardCheckout/useDeleteOrderCoupon/useDeleteOrderCoupon.ts#L44)
