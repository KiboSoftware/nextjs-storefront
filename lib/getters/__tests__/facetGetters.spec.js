import { categoryTreeDataMock } from '../../../__mocks__/stories/categoryTreeDataMock'
import { facetGetters } from '../facetGetters'

describe('[getters] facetGetters', () => {
  it('should return breadcrumbs', () => {
    expect(facetGetters.getBreadcrumbs(categoryTreeDataMock?.categoriesTree?.items)).toStrictEqual([
      { link: '/', text: 'Home' },
    ])
  })
})