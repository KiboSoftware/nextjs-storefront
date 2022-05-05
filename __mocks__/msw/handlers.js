import { graphql } from 'msw'

import { orderMock } from '../stories/orderMock'

export const handlers = [
  // useLoadCheckout
  graphql.query('getCheckoutQuery', (_req, res, ctx) => {
    return res(ctx.json(orderMock))
  }),

  // useLoadFromCart
  graphql.query('getOrCreateCheckoutFromCartMutation', (_req, res, ctx) => {
    return res(ctx.json(orderMock))
  }),

  // useUpdatePersonalInfo
  graphql.mutation('updatePersonalDetailsMutation', (_req, res, ctx) => {
    return res(ctx.json(orderMock))
  }),
]
