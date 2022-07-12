import { graphql } from 'msw'

import { cartItemMock } from '../stories/cartItemMock'
import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { configuredProductMock } from '../stories/configuredProductMock'
import { orderMock } from '../stories/orderMock'
import { productSearchResultMock } from '../stories/productSearchResultMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { userMock, loginUserMock, registerUserMock } from '../stories/userMock'

export const checkoutHandlers = [
  // useLoadCheckout
  graphql.query('getCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useCheckout
  graphql.query('getOrCreateCheckout', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useLoadFromCart
  graphql.mutation('getOrCreateCheckoutFromCart', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),

  // useCheckout
  graphql.mutation('updatePersonalDetails', (_req, res, ctx) => {
    return res(ctx.data(orderMock))
  }),
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
  graphql.mutation('addToCart', (_req, res, ctx) => {
    return res(
      ctx.data({
        addItemToCurrentCart: cartItemMock,
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
]
