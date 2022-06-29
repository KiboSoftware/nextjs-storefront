import { facetGetters } from '../facetGetters'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { facetValueMock } from '@/__mocks__/stories/facetValueMock'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

describe('[getters] facetGetters', () => {
  it('should return breadcrumbs', () => {
    expect(
      facetGetters.getBreadcrumbs({ categories: categoryTreeDataMock?.categoriesTree?.items })
    ).toStrictEqual([
      { link: '/', text: 'Home' },
      { link: '/category/M', text: 'Men' },
    ])
  })

  it('should return selected facets', () => {
    expect(facetGetters.getSelectedFacets(productSearchResultMock?.facets)).toEqual(facetValueMock)
  })
})
