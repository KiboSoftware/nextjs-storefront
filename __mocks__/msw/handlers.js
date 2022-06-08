import { graphql } from 'msw'

import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { configuredProductDataMock } from '../stories/configuredProductDataMock'
import { orderMock } from '../stories/orderMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { userMock, loginUserMock } from '../stories/userMock'

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

  // useProductMutation: configureProduct
  graphql.mutation('configureProduct', (_req, res, ctx) => {
    return res(ctx.data(configuredProductDataMock))
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

export const userHandlers = [
  // useUser
  graphql.query('getUser', (_req, res, ctx) => {
    return res(ctx.data(userMock))
  }),
  // login
  graphql.mutation('login', (_req, res, ctx) => {
    return res(ctx.data(loginUserMock))
  }),
]

export const handlers = [
  ...checkoutHandlers,
  ...searchSuggestionHandlers,
  ...categoryHandlers,
  ...userHandlers,
]
