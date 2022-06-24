import { graphql } from 'msw'

import { categoryTreeDataMock } from '../stories/categoryTreeDataMock'
import { orderMock } from '../stories/orderMock'
import { searchSuggestionMock } from '../stories/searchSuggestionResultMock'
import { productSearchResultMock } from '../stories/productSearchResultMock'

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
export const handlers = [
  ...checkoutHandlers,
  ...searchSuggestionHandlers,
  ...categoryHandlers,
  ...productSearchHandlers,
]
