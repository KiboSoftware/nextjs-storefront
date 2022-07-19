import { graphql } from 'msw'

import { orderMock, shippingRateMock } from '../stories'
import { cartItemMock } from '../stories/cartItemMock'
import { cartMock } from '../stories/cartMock'
import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { configuredProductMock } from '../stories/configuredProductMock'
import { locationCollectionMock } from '../stories/locationCollectionMock'
import { productSearchResultMock } from '../stories/productSearchResultMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { userMock, loginUserMock, registerUserMock } from '../stories/userMock'

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
  graphql.mutation('updatePersonalDetails', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // Shipping Step
  graphql.mutation('setShippingInformation', (_req, res, ctx) => {
    return res(ctx.data({ updateOrderFulfillmentInfo: orderMock.fulfillmentInfo }))
  }),

  graphql.query('getShippingRates', (_req, res, ctx) => {
    return res(ctx.data(shippingRateMock))
  }),

  // Payment Step

  // Order Reivew Sep
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
]

export const storeHandlers = [
  graphql.query('GetISPULocations', (_req, res, ctx) => {
    return res(ctx.data(locationCollectionMock))
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
]
