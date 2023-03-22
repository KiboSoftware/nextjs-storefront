// Query hooks
export * from './queries/useCheckoutQueries/useCheckoutQueries'
export * from './queries/useSearchSuggestionsQueries/useSearchSuggestionsQueries'
export * from './queries/useCategoryTreeQueries/useCategoryTreeQueries'
export * from './queries/useUserQueries/useUserQueries'
export * from './queries/useProductsQueries/useProductsQueries'
export * from './queries/useProductSearchQueries/useProductSearchQueries'
export * from './queries/useCartQueries/useCartQueries'
export * from './queries/useStoreLocationsQueries/useStoreLocationsQueries'
export * from './queries/usePurchaseLocationQueries/usePurchaseLocationQueries'
export * from './queries/useShippingMethodsQueries/useShippingMethodsQueries'
export * from './queries/useWishlistQueries/useWishlistQueries'
export * from './queries/useCustomerCardsQueries/useCustomerCardsQueries'
export * from './queries/useCustomerContactsQueries/useCustomerContactsQueries'
export * from './queries/useUserOrderQueries/useUserOrderQueries'
export * from './queries/useProductLocationInventoryQueries/useProductLocationInventoryQueries'
export * from './queries/useReturnReasonsQueries/useReturnReasonsQueries'
export * from './queries/useReturnsQueries/useReturnsQueries'
export * from './queries/useProductPriceQueries/useProductPriceQueries'
export * from './queries/subscription/useSubscriptionsQueries/useSubscriptionsQueries'

// Multiship Query
export * from './queries/multiShip/useCheckoutQueries/useCheckoutQueries'
export * from './queries/multiShip/useCheckoutDestinationQueries/useCheckoutDestinationQueries'
export * from './queries/multiShip/useCheckoutShippingMethodsQuery/useCheckoutShippingMethodsQuery'

// Custom hooks
export * from './custom/useDebounce/useDebounce'
export * from './custom/useUpdateRoutes/useUpdateRoutes'
export * from './custom/usePaymentTypes/usePaymentTypes'
export * from './custom/useProductDetailTemplate/useProductDetailTemplate'
export * from './custom/useCurrentLocation/useCurrentLocation'
export * from './custom/useWishlist/useWishlist'
export * from './custom/usePriceRangeFormatter/usePriceRangeFormatter'

// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------
// ------------------------------ Updated Mutation Imports ------------------------------------------------
// -----------------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------

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
export * from './mutations/multishipCheckout/useCreateCheckoutDestinationMutations/useCreateCheckoutDestinationMutations'
export * from './mutations/multishipCheckout/useUpdateCheckoutItemDestinationMutations/useUpdateCheckoutItemDestinationMutations'
export * from './mutations/multishipCheckout/useUpdateCheckoutDestinationMutations/useUpdateCheckoutDestinationMutations'
// Coupon
export * from './mutations/multishipCheckout/useUpdateCheckoutCouponMutation/useUpdateCheckoutCouponMutation'
export * from './mutations/multishipCheckout/useDeleteCheckoutCouponMutation/useDeleteCheckoutCouponMutation'

export * from './mutations/multishipCheckout/useCreateCheckoutActionMutation/useCreateCheckoutActionMutation'
export * from './mutations/multishipCheckout/useUpdateCheckoutPersonalInfoMutation/useUpdateCheckoutPersonalInfoMutation'
export * from './mutations/multishipCheckout/useCreateCheckoutFromCartMutation/useCreateCheckoutFromCartMutation'
export * from './mutations/multishipCheckout/useCreateCheckoutShippingMethodMutation/useCreateCheckoutShippingMethodMutation'
export * from './mutations/multishipCheckout/useCreateCheckoutPaymentActionMutation/useCreateCheckoutPaymentActionMutation'
export * from './mutations/multishipCheckout/useUpdateCheckoutPaymentActionMutation/useUpdateCheckoutPaymentActionMutation'

// My Account
export * from './mutations/myAccount/useUpdateCustomerProfile/useUpdateCustomerProfile'
export * from './mutations/myAccount/useChangePassword/useChangePassword'

// Product
export * from './mutations/product/configure/useConfigureProduct'

// Returns
export * from './mutations/returns/useCreateOrderReturn/useCreateOrderReturn'

// Standard Checkout
export * from './mutations/standardCheckout/useUpdateCheckoutPersonalInfo/useUpdateCheckoutPersonalInfoMutation'
export * from './mutations/standardCheckout/useUpdateCheckoutShippingInfo/useUpdateCheckoutShippingInfoMutation'
export * from './mutations/standardCheckout/useUpdateCheckoutBillingInfo/useUpdateCheckoutBillingInfoMutation'
export * from './mutations/standardCheckout/useUpdateOrderPaymentActionMutation/useUpdateOrderPaymentActionMutation'
export * from './mutations/standardCheckout/useCreateCheckoutPaymentMethod/useCreateOrderPaymentMethodMutation'
export * from './mutations/standardCheckout/useCreateOrderMutations/useCreateOrderMutation'
export * from './mutations/standardCheckout/useCreateFromCart/useCreateFromCartMutation'
export * from './mutations/standardCheckout/useUpdateOrderCouponMutation/useUpdateOrderCouponMutation'
export * from './mutations/standardCheckout/useDeleteOrderCouponMutation/useDeleteOrderCouponMutation'

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
