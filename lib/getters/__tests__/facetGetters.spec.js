import { facetGetters } from '../facetGetters'
import { appliedFiltersMock } from '@/__mocks__/stories/appliedFiltersMock'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
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

  it('should call getSelectedFacets function', () => {
    expect(facetGetters.getSelectedFacets(productSearchResultMock?.facets)).toEqual(
      appliedFiltersMock
    )
  })
})
