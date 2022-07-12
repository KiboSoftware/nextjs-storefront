import getConfig from 'next/config'

import { facetGetters } from '../facetGetters'
import { categoryTreeDataMock } from '@/__mocks__/stories/categoryTreeDataMock'
import { facetValueMock } from '@/__mocks__/stories/facetValueMock'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'

const sortingOptionsMock = {
  options: [
    { id: '', selected: false, value: 'Best Match' },
    { id: 'price asc', selected: true, value: 'Price: Low to High' },
    { id: 'price desc', selected: false, value: 'Price: High to Low' },
    { id: 'createDate desc', selected: false, value: 'Latest' },
    { id: 'createDate asc', selected: false, value: 'Oldest' },
  ],
  selected: 'price asc',
}

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

  it('should return sorting options', () => {
    const { publicRuntimeConfig } = getConfig()
    expect(
      facetGetters.getSortOptions(
        { ...productSearchResultMock, input: { sort: 'price asc' } },
        publicRuntimeConfig.productListing.sortOptions
      )
    ).toEqual(sortingOptionsMock)
  })
})
