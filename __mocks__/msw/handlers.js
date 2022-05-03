// import { rest } from 'msw';

import { mockStaff, mockCheckout } from './mockData'

export const handlers = [
  rest.get('http://localhost:3030/staff', (req, res, ctx) => {
    return res(ctx.json(mockStaff))
  }),

  rest.get('http://localhost:3000/checkout', (req, res, ctx) => {
    return res(ctx.json(mockCheckout))
  }),
]
