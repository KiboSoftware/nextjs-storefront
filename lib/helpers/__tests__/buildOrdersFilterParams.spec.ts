import { buildOrdersFilterParams } from '../buildOrdersFilterParams'

describe('[helpers] buildOrdersFilterParams function', () => {
  it('should return order filter by order number and billing email', () => {
    const variables = {
      startIndex: 0,
      pageSize: 20,
    }
    const buildOrdersFilterParamsMock = {
      startIndex: 0,
      pageSize: 20,
      filter: 'orderNumber eq 81 and email eq chandra@email.com and status ne Abandoned',
    }
    expect(buildOrdersFilterParams(variables)).toStrictEqual(buildOrdersFilterParamsMock)
  })
})
