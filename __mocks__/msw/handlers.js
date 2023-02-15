import { graphql, rest } from 'msw'

import {
  orderMock,
  locationInventoryCollectionMock,
  shippingRateMock,
  returnReasonsMock,
  createReturnMock,
  checkoutMock,
  checkoutGroupRatesMock,
  orderSubscriptionNowMock,
  deleteSubscriptionMock,
} from '../stories'
import { cartItemMock } from '../stories/cartItemMock'
import { cartCouponMock, cartMock } from '../stories/cartMock'
import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { checkoutDestinationsMock } from '../stories/checkoutDestinationsMock'
import { configuredProductMock } from '../stories/configuredProductMock'
import { createCustomerAccountCardMock } from '../stories/createCustomerAccountCardMock'
import { createOrderPaymentActionMock } from '../stories/createOrderPaymentActionMock'
import { customerAccountCardsMock } from '../stories/customerAccountCardsMock'
import { locationCollectionMock } from '../stories/locationCollectionMock'
import { orderCollection } from '../stories/orderCollection'
import { orderCouponMock } from '../stories/orderMock'
import { productPriceMock } from '../stories/productPriceMock'
import { productSearchResultMock } from '../stories/productSearchResultMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { subscriptionCollectionMock } from '../stories/subscriptionCollectionMock'
import { updateCustomerAccountCardMock } from '../stories/updateCustomerAccountCardMock'
import { updateCustomerAccountContactMock } from '../stories/updateCustomerAccountContact'
import { updateOrderBillingInfoMock } from '../stories/updateOrderBillingInfoMock'
import { userAddressMock } from '../stories/userAddressMock'
import { userMock, loginUserMock, registerUserMock } from '../stories/userMock'
import { wishlistMock } from '../stories/wishlistMock'
import { subscriptionMock } from '@/__mocks__/stories/subscriptionMock'

const baseUrl = 'http://localhost:3000'
const mockCreateCustomerAccount = {
  createCustomerAccountContact: updateCustomerAccountContactMock.updateCustomerAccountContact,
}

export const checkoutHandlers = [
  graphql.query('getCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  graphql.query('getOrCreateCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  graphql.mutation('createMultiShipCheckout', (_req, res, ctx) => {
    return res(ctx.data(checkoutMock))
  }),

  graphql.mutation('getOrCreateCheckoutFromCart', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // MultiShip
  graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
    return res(ctx.data(checkoutMock))
  }),

  graphql.query('getCheckoutShippingMethods', (_req, res, ctx) => {
    return res(ctx.data(checkoutGroupRatesMock))
  }),

  // Details Step
  graphql.mutation('setPersonalInfo', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // Shipping Step
  graphql.mutation('setShippingInformation', (_req, res, ctx) => {
    return res(ctx.data({ updateOrderFulfillmentInfo: orderMock.checkout.fulfillmentInfo }))
  }),

  graphql.query('getShippingRates', (_req, res, ctx) => {
    return res(ctx.data(shippingRateMock))
  }),

  // Payment Step
  graphql.mutation('setBillingInformation', (_req, res, ctx) => {
    return res(ctx.data(updateOrderBillingInfoMock))
  }),

  graphql.mutation('addPaymentMethod', (_req, res, ctx) => {
    return res(ctx.data(createOrderPaymentActionMock))
  }),

  graphql.mutation('createOrderPaymentPaymentAction', (_req, res, ctx) => {
    return res(
      ctx.data({
        createOrderPaymentPaymentAction: createOrderPaymentActionMock.createOrderPaymentAction,
      })
    )
  }),

  // Review Step
  graphql.mutation('createOrderAction', (_req, res, ctx) => {
    return res(ctx.data({ createOrderAction: orderMock.checkout }))
  }),

  //checkout coupon
  graphql.mutation('updateCheckoutCoupon', (_req, res, ctx) => {
    return res(ctx.data({ updateCheckoutCoupon: checkoutMock }))
  }),
  graphql.mutation('deleteCheckoutCoupon', (_req, res, ctx) => {
    return res(ctx.data({ deleteCheckoutCoupon: checkoutMock }))
  }),

  // Multi Ship Payment
  graphql.mutation('checkoutPaymentAction', (_req, res, ctx) => {
    return res(
      ctx.data({
        createCheckoutPaymentAction: checkoutMock,
      })
    )
  }),

  graphql.mutation('updateCheckoutPaymentActionMutation', (_req, res, ctx) => {
    return res(
      ctx.data({
        updateCheckoutPaymentAction: checkoutMock,
      })
    )
  }),

  // Shipping Step
  graphql.mutation('updateCheckout', (_req, res, ctx) => {
    return res(ctx.data(checkoutMock))
  }),
  // Multiship
  graphql.mutation('createCheckoutAction', (_req, res, ctx) => {
    return res(ctx.data({ createCheckoutAction: checkoutMock }))
  }),

  graphql.mutation('createCheckoutShippingMethod', (_req, res, ctx) => {
    return res(ctx.data(checkoutMock))
  }),
]

export const accountHandlers = [
  graphql.query('customerAccountCards', (_req, res, ctx) => {
    return res(ctx.data(customerAccountCardsMock))
  }),

  //userAddress
  graphql.query('getUserAddresses', (_req, res, ctx) => {
    return res(ctx.data(userAddressMock))
  }),

  graphql.mutation('createCustomerAccountContact', (_req, res, ctx) => {
    return res(ctx.data({ ...mockCreateCustomerAccount }))
  }),

  graphql.mutation('updateCustomerAccountContact', (_req, res, ctx) => {
    return res(ctx.data(updateCustomerAccountContactMock))
  }),

  graphql.mutation('deleteCustomerAccountContact', (_req, res, ctx) => {
    return res(ctx.data({ deleteCustomerAccountContact: true }))
  }),

  graphql.mutation('createCustomerAccountCard', (_req, res, ctx) => {
    return res(ctx.data(createCustomerAccountCardMock))
  }),

  graphql.mutation('updateCustomerAccountCard', (_req, res, ctx) => {
    return res(ctx.data(updateCustomerAccountCardMock))
  }),

  graphql.mutation('deleteCustomerAccountCard', (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteCustomerAccountCard: true,
      })
    )
  }),

  graphql.mutation('updateCustomerData', (_req, res, ctx) => {
    return res(ctx.data({}))
  }),
]

export const productHandlers = [
  graphql.mutation('configureProduct', (_req, res, ctx) => {
    return res(ctx.data(configuredProductMock))
  }),
  graphql.query('getProductPrice', (_req, res, ctx) => {
    return res(ctx.data({ product: productPriceMock }))
  }),
]

export const searchSuggestionHandlers = [
  // useSearchSuggestions
  graphql.query('getSearchSuggestions', (_req, res, ctx) => {
    return res(ctx.data(searchSuggestionMock))
  }),
]

export const categoryHandlers = [
  rest.get(`${baseUrl}/api/category-tree`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(categoryTreeDataMock.categoriesTree.items))
  }),
]

export const productSearchHandlers = [
  // useProductSearch
  graphql.query('ProductSearch', (_req, res, ctx) => {
    return res(ctx.data({ products: productSearchResultMock }))
  }),
]
export const userHandlers = [
  // useUser
  graphql.query('getUser', (_req, res, ctx) => {
    return res(ctx.data(userMock))
  }),

  // login
  graphql.mutation('login', (_req, res, ctx) => {
    return res(ctx.data(loginUserMock))
  }),
  // create account or registration
  graphql.mutation('registerUser', (_req, res, ctx) => {
    return res(ctx.data(registerUserMock))
  }),
]

export const cartHandlers = [
  graphql.query('cart', (_req, res, ctx) => {
    return res(ctx.data(cartMock))
  }),

  graphql.mutation('addToCart', (_req, res, ctx) => {
    return res(
      ctx.data({
        addItemToCurrentCart: cartItemMock,
      })
    )
  }),

  graphql.mutation('updateCartItemQuantity', (_req, res, ctx) => {
    return res(
      ctx.data({
        updateCartItemQuantity: cartItemMock,
      })
    )
  }),

  graphql.mutation('deleteCartItem', (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteCartItemMutation: true,
      })
    )
  }),

  graphql.mutation('updateCurrentCartItem', (_req, res, ctx) => {
    return res(
      ctx.data({
        updateCurrentCartItem: cartItemMock,
      })
    )
  }),

  graphql.mutation('updateCartCoupon', (_req, res, ctx) => {
    return res(ctx.data(cartCouponMock))
  }),

  graphql.mutation('deleteCartCoupon', (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteCartCoupon: '1234',
      })
    )
  }),
]

export const storeHandlers = [
  graphql.query('GetISPULocations', (_req, res, ctx) => {
    return res(ctx.data(locationCollectionMock))
  }),
]

export const wishlistHandlers = [
  // useWishlistQueries
  graphql.query('wishlists', (_req, res, ctx) => {
    return res(ctx.data({ wishlists: wishlistMock }))
  }),

  graphql.mutation('createWishlist', (_req, res, ctx) => {
    const { customerAccountId, id, name } = wishlistMock?.items[0]
    return res(ctx.data({ createWishlist: { customerAccountId, id, name, items: [] } }))
  }),
  // useAddToWishlistMutation
  graphql.mutation('createWishlistItem', (_req, res, ctx) => {
    return res(ctx.data({ createWishlistItem: wishlistMock?.items[0].items[0] }))
  }),
  // useRemoveWishlistItemMutation
  graphql.mutation('deletewishlistitem', (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteWishlistItem: true,
      })
    )
  }),
]

export const orderHandlers = [
  graphql.query('getOrders', (_req, res, ctx) => {
    return res(ctx.data(orderCollection))
  }),
  graphql.query('returnReasons', (_req, res, ctx) => {
    return res(ctx.data({ returnReasons: returnReasonsMock.returnReasons }))
  }),
  graphql.query('getCheckoutDestination', (_req, res, ctx) => {
    return res(ctx.data({ checkoutDestination: checkoutDestinationsMock.checkoutDestinations[0] }))
  }),
  graphql.query('getCheckoutDestinations', (_req, res, ctx) => {
    return res(ctx.data({ checkoutDestinations: checkoutDestinationsMock.checkoutDestinations }))
  }),
  graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
    return res(ctx.data(checkoutMock))
  }),

  graphql.mutation('updateOrderCoupon', (_req, res, ctx) => {
    return res(ctx.data(orderCouponMock))
  }),
  graphql.mutation('deleteOrderCoupon', (_req, res, ctx) => {
    return res(
      ctx.data({
        deleteOrderCoupon: '1234',
      })
    )
  }),
  graphql.mutation('createReturn', (_req, res, ctx) => {
    return res(ctx.data(createReturnMock))
  }),

  graphql.mutation('createCheckoutDestination', (_req, res, ctx) => {
    return res(
      ctx.data({
        createCheckoutDestination: checkoutDestinationsMock.checkoutDestinations[0],
      })
    )
  }),
  graphql.mutation('updateCheckoutDestination', (_req, res, ctx) => {
    return res(
      ctx.data({
        updateCheckoutDestination: checkoutDestinationsMock.checkoutDestinations[0],
      })
    )
  }),
  graphql.mutation('updateCheckoutItemDestination', (_req, res, ctx) => {
    return res(
      ctx.data({
        updateCheckoutItemDestination: checkoutMock.checkout,
      })
    )
  }),
]

export const inventoryHandlers = [
  graphql.query('productLocationInventory', (_req, res, ctx) => {
    return res(ctx.data(locationInventoryCollectionMock))
  }),
]

export const subscriptionHandlers = [
  // getSubscriptions
  graphql.query('getSubscriptions', (_req, res, ctx) => {
    return res(ctx.data(subscriptionCollectionMock))
  }),

  graphql.mutation('orderSubscriptionNow', (_req, res, ctx) => {
    return res(ctx.data(orderSubscriptionNowMock))
  }),

  graphql.mutation('skipNextSubscription', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('deleteSubscriptionItem', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('updateSubscriptionFrequency', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('updateSubscriptionNextOrderDate', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('updateSubscriptionPayment', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('updateSubscriptionFulfillmentInfo', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),

  graphql.mutation('performSubscriptionAction', (_req, res, ctx) => {
    return res(ctx.data(subscriptionMock))
  }),
]

export const handlers = [
  ...checkoutHandlers,
  ...searchSuggestionHandlers,
  ...categoryHandlers,
  ...productSearchHandlers,
  ...userHandlers,
  ...productHandlers,
  ...cartHandlers,
  ...storeHandlers,
  ...wishlistHandlers,
  ...accountHandlers,
  ...orderHandlers,
  ...inventoryHandlers,
  ...subscriptionHandlers,
]
