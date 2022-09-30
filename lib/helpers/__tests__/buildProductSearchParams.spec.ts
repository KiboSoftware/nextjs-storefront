import { buildProductSearchParams } from '../buildProductSearchParams'

describe('[helpers] buildProductSearchParams function', () => {
  it('should return the product search input according to search params', () => {
    const searchParams = {
      filters: ['tenant~brand:adidas,tenant~color:grey'],
      categoryCode: '30',
    }
    const buildProductSearchParamsMock = {
      query: '',
      startIndex: 0,
      pageSize: 16,
      sortBy: '',
      facet: 'categoryCode',
      facetHierValue: 'categoryCode:30',
      facetTemplate: 'categoryCode:30',
      facetValueFilter: 'categoryCode:30,tenant~brand:adidas,tenant~color:grey',
      filter: '',
    }
    expect(buildProductSearchParams(searchParams)).toStrictEqual(buildProductSearchParamsMock)
  })
})
