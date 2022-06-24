import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductListingTemplate from './ProductListingTemplate'
import { appliedFiltersMock } from '@/__mocks__/stories/appliedFiltersMock'
import { categoryFacetDataMock } from '@/__mocks__/stories/categoryFacetDataMock'
import { productSearchResultMock } from '@/__mocks__/stories/productSearchResultMock'
import type { ProductCustom } from '@/lib/types'

import type { Facet } from '@/lib/gql/types'

const breadcrumbs = [
  {
    text: 'Home',
    link: '/',
  },
  {
    text: 'Sports',
    link: '/sports',
  },
  {
    text: 'Shoes',
    link: '/sports/shoes',
  },
]

const sortingValues = [
  {
    value: 'Default',
    id: '',
    selected: false,
  },
  {
    value: 'Price: Low to High',
    id: 'price asc',
    selected: false,
  },
  {
    value: 'Price: High to Low',
    id: 'price desc',
    selected: false,
  },
  {
    value: 'Latest',
    id: 'createDate desc',
    selected: false,
  },
  {
    value: 'Oldest',
    id: 'createDate asc',
    selected: false,
  },
]

export default {
  title: 'Page Templates/category',
  component: ProductListingTemplate,
  argTypes: {
    onSortingSelection: { action: 'onChange' },
  },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ProductListingTemplate>

const Template: ComponentStory<typeof ProductListingTemplate> = (args) => (
  <ProductListingTemplate {...args} />
)

export const Category = Template.bind({})
export const CategorySkeleton = Template.bind({})

Category.args = {
  breadCrumbsList: breadcrumbs,
  facetList: productSearchResultMock?.facets as Facet[],
  products: productSearchResultMock?.items as ProductCustom[],
  sortingValues,
  categoryFacet: categoryFacetDataMock,
  totalResults: 149,
  initialProductsToShow: 16,
  isLoading: false,
  appliedFilters: appliedFiltersMock,
}

CategorySkeleton.args = {
  breadCrumbsList: breadcrumbs,
  facetList: productSearchResultMock?.facets as Facet[],
  products: [],
  sortingValues,
  categoryFacet: categoryFacetDataMock,
  isLoading: true,
  appliedFilters: appliedFiltersMock,
}
