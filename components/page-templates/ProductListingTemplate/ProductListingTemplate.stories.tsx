import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { categoryFacet } from '../../../__mocks__/stories/categoryFacetDataMock'
import { products } from '../../../__mocks__/stories/categoryPageProductsDataMock'
import { facetList } from '../../../__mocks__/stories/facetListMock'
import ProductListingTemplate from './ProductListingTemplate'

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
    onCategoryChildrenSelection: { action: 'clicked' },
    onBackButtonClick: { action: 'go to Previous route' },
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
  facetList,
  products,
  sortingValues,
  categoryFacet,
  totalResults: 149,
  initialProductsToShow: 16,
  isLoading: false,
}

CategorySkeleton.args = {
  breadCrumbsList: breadcrumbs,
  facetList,
  products: [],
  sortingValues,
  categoryFacet,
  isLoading: true,
}
