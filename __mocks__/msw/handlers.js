import { graphql, rest } from 'msw'

import { orderMock, shippingRateMock } from '../stories'
import { cartItemMock } from '../stories/cartItemMock'
import { cartMock } from '../stories/cartMock'
import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { configuredProductMock } from '../stories/configuredProductMock'
import { createOrderPaymentActionMock } from '../stories/createOrderPaymentActionMock'
import { customerAccountCardsMock } from '../stories/customerAccountCardsMock'
import { getUserAddressesMock } from '../stories/getUserAddressesMock'
import { locationCollectionMock } from '../stories/locationCollectionMock'
import { productSearchResultMock } from '../stories/productSearchResultMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { updateOrderBillingInfoMock } from '../stories/updateOrderBillingInfoMock'
import { userMock, loginUserMock, registerUserMock } from '../stories/userMock'
import { wishlistMock } from '../stories/wishlistMock'

export const checkoutHandlers = [
  graphql.query('getCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  graphql.query('getOrCreateCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  graphql.mutation('getOrCreateCheckoutFromCart', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
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

  graphql.query('customerAccountCards', (_req, res, ctx) => {
    return res(ctx.data(customerAccountCardsMock))
  }),

  graphql.query('getUserAddresses', (_req, res, ctx) => {
    return res(ctx.data(getUserAddressesMock))
  }),

  // graphql.mutation('createOrderPaymentPaymentAction', (_req, res, ctx) => {
  //   return res(ctx.data(shippingRateMock))
  // })

  // Order Reivew Step
]

export const productHandlers = [
  graphql.mutation('configureProduct', (_req, res, ctx) => {
    return res(ctx.data(configuredProductMock))
  }),
]

export const searchSuggestionHandlers = [
  // useSearchSuggestions
  graphql.query('getSearchSuggestions', (_req, res, ctx) => {
    return res(ctx.data(searchSuggestionMock))
  }),
]

export const categoryHandlers = [
  // useSearchSuggestions
  graphql.query('getCategoryTreeQuery', (_req, res, ctx) => {
    return res(ctx.data(categoryTreeDataMock))
  }),
]

export const productSearchHandlers = [
  // useProductSearch
  graphql.query('ProductSearch', (_req, res, ctx) => {
    return res(ctx.data(productSearchResultMock))
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
]
