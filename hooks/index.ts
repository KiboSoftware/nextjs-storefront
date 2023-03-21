// Query hooks

// address
export * from './queries/address/useGetCustomerAddresses/useGetCustomerAddresses'

// card
export * from './queries/card/useGetCards/useGetCards'

// cart
export * from './queries/cart/useGetCart/useGetCart'

// category
export * from './queries/category/useGetCategoryTree/useGetCategoryTree'

// locations
export * from './queries/locations/useGetStoreLocations/useGetStoreLocations'
export * from './queries/locations/useGetPurchaseLocation/useGetPurchaseLocation'

// MultishipCheckout
export * from './queries/multishipCheckout/useGetCurrentCheckout/useGetCurrentCheckout'
export * from './queries/multishipCheckout/useGetDestination/useGetDestination'
export * from './queries/multishipCheckout/useGetCheckoutShippingMethods/useGetCheckoutShippingMethods'
export * from './queries/multishipCheckout/useGetDestinations/useGetDestinations'

// product
export * from './queries/product/useGetProducts/useGetProducts'
export * from './queries/product/useGetProductInventory/useGetProductInventory'
export * from './queries/product/useGetProductPrice/useGetProductPrice'

//returns
export * from './queries/returns/useGetReturnReasons/useGetReturnReasons'
export * from './queries/returns/useGetReturns/useGetReturns'

// search
export * from './queries/search/useGetSearchSuggestions/useGetSearchSuggestions'
export * from './queries/search/useGetSearchedProducts/useGetSearchedProducts'

// standardCheckout
export * from './queries/standardCheckout/useGetCurrentOrder/useGetCurrentOrder'
export * from './queries/standardCheckout/useGetShippingMethods/useGetShippingMethods'

// myAccount
export * from './queries/myAccount/useGetCustomerOrders/useGetCustomerOrders'
export * from './queries/myAccount/useGetCurrentCustomer/useGetCurrentCustomer'

// subscription
export * from './queries/subscription/useGetSubscriptions/useGetSubscriptions'

// wishlist
export * from './queries/wishlist/useGetWishlist/useGetWishlist'

// Custom hooks
export * from './custom/useDebounce/useDebounce'
export * from './custom/useUpdateRoutes/useUpdateRoutes'
export * from './custom/usePaymentTypes/usePaymentTypes'
export * from './custom/useProductDetailTemplate/useProductDetailTemplate'
export * from './custom/useCurrentLocation/useCurrentLocation'
export * from './custom/useWishlist/useWishlist'
export * from './custom/usePriceRangeFormatter/usePriceRangeFormatter'

// Mutations

// Address
export * from './mutations/address/create/useCreateCustomerAddress'
export * from './mutations/address/update/useUpdateCustomerAddress'
export * from './mutations/address/delete/useDeleteCustomerAddress'

// Auth
export * from './mutations/auth/login/useLogin'
export * from './mutations/auth/register/useRegister'

// Cards
export * from './mutations/card/create/useCreateCustomerCard'
export * from './mutations/card/update/useUpdateCustomerCard'
export * from './mutations/card/delete/useDeleteCustomerCard'

// Cart
export * from './mutations/cart/useAddCartItem/useAddCartItem'
export * from './mutations/cart/useDeleteCartItem/useDeleteCartItem'
export * from './mutations/cart/useUpdateCartItem/useUpdateCartItem'
export * from './mutations/cart/useUpdateCartItemQuantity/useUpdateCartItemQuantity'
export * from './mutations/cart/useUpdateCartCoupon/useUpdateCartCoupon'
export * from './mutations/cart/useDeleteCartCoupon/useDeleteCartCoupon'

// Multiship
// Destinations
export * from './mutations/multishipCheckout/useCreateDestination/useCreateDestination'
export * from './mutations/multishipCheckout/useUpdateItemDestination/useUpdateItemDestination'
export * from './mutations/multishipCheckout/useUpdateDestination/useUpdateDestination'
// Coupon
export * from './mutations/multishipCheckout/useUpdateCheckoutCoupon/useUpdateCheckoutCoupon'
export * from './mutations/multishipCheckout/useDeleteCheckoutCoupon/useDeleteCheckoutCoupon'

export * from './mutations/multishipCheckout/useCreateCheckout/useCreateCheckout'
export * from './mutations/multishipCheckout/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfo'
export * from './mutations/multishipCheckout/useInitiateCheckout/useInitiateCheckout'
export * from './mutations/multishipCheckout/useCreateCheckoutShippingMethod/useCreateCheckoutShippingMethod'
export * from './mutations/multishipCheckout/useAddCheckoutPayment/useAddCheckoutPayment'
export * from './mutations/multishipCheckout/useVoidCheckoutPayment/useVoidCheckoutPayment'

// My Account
export * from './mutations/myAccount/useUpdateCustomerProfile/useUpdateCustomerProfile'
export * from './mutations/myAccount/useChangePassword/useChangePassword'

// Product
export * from './mutations/product/configure/useConfigureProduct'

// Returns
export * from './mutations/returns/useCreateOrderReturn/useCreateOrderReturn'

// Standard Checkout
export * from './mutations/standardCheckout/useUpdateOrderPersonalInfo/useUpdateOrderPersonalInfo'
export * from './mutations/standardCheckout/useUpdateOrderShippingInfo/useUpdateCheckoutShippingInfoMutation'
export * from './mutations/standardCheckout/useUpdateOrderBillingInfo/useUpdateOrderBillingInfo'
export * from './mutations/standardCheckout/useVoidOrderPayment/useVoidOrderPayment'
export * from './mutations/standardCheckout/useAddOrderPaymentInfo/useAddOrderPaymentInfo'
export * from './mutations/standardCheckout/useCreateOrder/useCreateOrder'
export * from './mutations/standardCheckout/useInitiateOrder/useInitiateOrder'
export * from './mutations/standardCheckout/useUpdateOrderCoupon/useUpdateOrderCoupon'
export * from './mutations/standardCheckout/useDeleteOrderCoupon/useDeleteOrderCoupon'

// Wishlist
export * from './mutations/wishlist/useAddToWishlistItem/useAddToWishlistItem'
export * from './mutations/wishlist/useDeleteWishlistItem/useDeleteWishlistItem'
export * from './mutations/wishlist/useCreateWishlist/useCreateWishlist'

//Subscription
export * from './mutations/subscription/useOrderSubscriptionNow/useOrderSubscriptionNow'
export * from './mutations/subscription/useUpdateSubscriptionFrequency/useUpdateSubscriptionFrequency'
export * from './mutations/subscription/useSkipNextSubscription/useSkipNextSubscription'
export * from './mutations/subscription/useUpdateSubscriptionState/useUpdateSubscriptionState'
export * from './mutations/subscription/useUpdateSubscriptionNextOrderDate/useUpdateSubscriptionNextOrderDate'
export * from './mutations/subscription/useUpdateSubscriptionShippingInfo/useUpdateSubscriptionShippingInfo'
export * from './mutations/subscription/useDeleteSubscription/useDeleteSubscription'
export * from './mutations/subscription/useUpdateSubscriptionPayment/useUpdateSubscriptionPayment'
