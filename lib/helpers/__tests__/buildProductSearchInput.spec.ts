import { buildProductSearchInput } from '../buildProductSearchInput'

describe('[helpers] buildProductSearchInput function', () => {
  it('should return the product search input according to search params', () => {
    const searchParams = {
      filters: ['tenant~brand:adidas,tenant~color:grey'],
      categoryCode: '30',
    }
    const buildProductSearchInputMock = {
      query: '',
      startIndex: 0,
      pageSize: 16,
      sortBy: '',
      facetHierValue: 'categoryCode:30',
      facetTemplate: 'categoryCode:30',
      facetValueFilter: 'categoryCode:30,tenant~brand:adidas,tenant~color:grey',
      filter: '',
    }
    expect(buildProductSearchInput(searchParams)).toStrictEqual(buildProductSearchInputMock)
  })

  it('should return the product codes filter according to search params', () => {
    const searchParams = {
      productCodes: [{ productCode: 'HKFT_019' }],
    }

    const productCodesResult = {
      filter: 'productCode eq HKFT_019',
    }

    expect(buildProductSearchInput(searchParams)).toStrictEqual(productCodesResult)
  })
})
