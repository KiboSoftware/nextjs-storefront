import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { categoryFacet } from '../../../__mocks__/stories/categoryFacetDataMock'
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

const products = [
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-1',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-2',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-3',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-4',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-5',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-6',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-7',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-8',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-9',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-10',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-11',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-12',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-13',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-14',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-15',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-16',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-17',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-18',
    price: '$19.98',
    title: 'This is a product',
  },
  {
    imageUrl: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FMCFLCcOwFxZ3FNt8RKne3iqrwqY8OOnCw&usqp=CAU`,
    link: '/product/test-19',
    price: '$19.98',
    title: 'This is a product',
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
    onChange: { action: 'onChange' },
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
  totalResults: '149',
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
