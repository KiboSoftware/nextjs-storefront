import { productSearchDataMock } from '../../../__mocks__/stories/productSearchDataMock'
import { productSearchGetters } from '../productSearchGetters'

describe('[getters] productSearchGetters', () => {
  it('should return all the products', () => {
    expect(productSearchGetters.getProducts(productSearchDataMock)).toStrictEqual(
      productSearchDataMock.items
    )
  })

  it('should return all the category facets', () => {
    const categoryFacetMocks = productSearchDataMock?.facets?.find(
      (facet) => facet.field === 'CategoryCode'
    ).values[0]
    expect(productSearchGetters.getCategoryFacet(productSearchDataMock, '53')).toStrictEqual({
      header: categoryFacetMocks.label,
      childrenCategories: categoryFacetMocks.childrenFacetValues,
    })
  })

  it('should return total number of products', () => {
    expect(productSearchGetters.getTotalProducts(productSearchDataMock)).toBe(
      productSearchDataMock?.totalCount
    )
  })
})
