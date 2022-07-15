import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductListingTemplate from './ProductListingTemplate'
import { categoryFacetDataMock } from '@/__mocks__/stories/categoryFacetDataMock'
import { facetValueMock } from '@/__mocks__/stories/facetValueMock'
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

const sortingValues = {
  options: [
    {
      value: 'Best Match',
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
  ],
  selected: '',
}

export default {
  title: 'Page Templates/product-listing',
  component: ProductListingTemplate,
  argTypes: {
    onSortItemSelection: { action: 'onChange' },
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
  productListingHeader: 'Apparel',
  facetList: productSearchResultMock?.facets as Facet[],
  products: productSearchResultMock?.items as ProductCustom[],
  sortingValues,
  categoryFacet: categoryFacetDataMock,
  pageSize: 16,
  totalResults: 149,
  isLoading: false,
  appliedFilters: facetValueMock,
}

CategorySkeleton.args = {
  breadCrumbsList: breadcrumbs,
  facetList: productSearchResultMock?.facets as Facet[],
  products: [],
  sortingValues,
  categoryFacet: categoryFacetDataMock,
  isLoading: true,
  appliedFilters: facetValueMock,
}
