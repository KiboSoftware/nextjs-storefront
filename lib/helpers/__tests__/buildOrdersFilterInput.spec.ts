import { buildOrdersFilterInputParams } from '../buildOrdersFilterInputParams'

describe('[helpers] buildOrdersFilterInputParams function', () => {
  it('should return order filter by order number and billing email', () => {
    const variables = {
      startIndex: 0,
      pageSize: 20,
    }
    const buildOrdersFilterInputParamsMock = {
      startIndex: 0,
      pageSize: 20,
      filter: 'orderNumber eq 81 and email eq chandra@email.com and status ne Abandoned',
    }
    expect(buildOrdersFilterInputParams(variables)).toStrictEqual(buildOrdersFilterInputParamsMock)
  })
})
