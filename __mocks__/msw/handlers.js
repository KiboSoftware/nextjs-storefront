import { rest } from 'msw'

import { mockCheckout } from './mockData'

export const handlers = [
  rest.get('http://localhost:3000/checkout', (_req, res, ctx) => {
    return res(ctx.json(mockCheckout))
  }),
]
