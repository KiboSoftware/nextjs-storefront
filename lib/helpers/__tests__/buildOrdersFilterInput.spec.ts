import { buildOrdersFilterInput } from '../buildOrdersFilterInput'

describe('[helpers] buildOrdersFilterInput function', () => {
  it('should return order filter by order number and billing email', () => {
    const variables = {
      orderNumber: '81',
      billingEmail: 'chandra@email.com',
      startIndex: 0,
      pageSize: 20,
    }
    const buildOrdersFilterInputMock = {
      startIndex: 0,
      pageSize: 20,
      filter: 'orderNumber eq 81 and email eq chandra@email.com and status ne Abandoned',
    }
    expect(buildOrdersFilterInput(variables)).toStrictEqual(buildOrdersFilterInputMock)
  })
})
