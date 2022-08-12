import getConfig from 'next/config'

import { FacetTypeForHistory } from '../../constants'
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

const facetTypeMock = FacetTypeForHistory
facetTypeMock[0].values[0].isApplied = true

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

  it('should return selected facet items value', () => {
    expect(facetGetters.getSelectedFacetItems(facetTypeMock[0]?.values)).toEqual('M-1')
  })

  it('should return facet list by query filter', () => {
    expect(facetGetters.getFacetListByQueryFilter(['M-1'])).toEqual(facetTypeMock[0]?.values)
  })

  it('should return applied facet list', () => {
    expect(facetGetters.getAppliedFacetList(facetTypeMock[0]?.values)).toEqual([
      facetTypeMock[0]?.values[0],
    ])
  })
})
