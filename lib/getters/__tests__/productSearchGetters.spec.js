import { productSearchGetters } from '../productSearchGetters'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

describe('[getters] productSearchGetters', () => {
  it('should return all the products', () => {
    expect(productSearchGetters.getProducts(productSearchResultMock)).toStrictEqual(
      productSearchResultMock.items
    )
  })

  it('should return all the category facets', () => {
    const categoryFacetMocks = productSearchResultMock?.facets?.find(
      (facet) => facet.field === 'CategoryCode'
    ).values[0]
    expect(productSearchGetters.getCategoryFacet(productSearchResultMock, '53')).toStrictEqual({
      header: categoryFacetMocks.label,
      childrenCategories: categoryFacetMocks.childrenFacetValues,
    })
  })

  it('should return total number of products', () => {
    expect(productSearchGetters.getTotalProducts(productSearchResultMock)).toBe(
      productSearchResultMock?.totalCount
    )
  })
})
