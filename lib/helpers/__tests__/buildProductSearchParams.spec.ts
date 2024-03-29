import { buildProductSearchParams } from '../buildProductSearchParams'

describe('[helpers] buildProductSearchParams function', () => {
  it('should return the product search input according to search params', () => {
    const searchParams = {
      filters: 'tenant~brand:adidas,tenant~color:grey',
      categoryCode: '30',
      pageSize: 16,
    }
    const buildProductSearchParamsMock = {
      query: '',
      startIndex: 0,
      pageSize: 16,
      sortBy: '',
      facet: 'categoryCode',
      facetHierValue: 'categoryCode:30',
      facetTemplate: 'categoryCode:30',
      facetValueFilter: 'tenant~brand:adidas,tenant~color:grey',
      filter: 'categoryCode req 30',
    }
    expect(buildProductSearchParams(searchParams)).toStrictEqual(buildProductSearchParamsMock)
  })
})
