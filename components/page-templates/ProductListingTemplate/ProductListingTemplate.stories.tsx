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
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/3e86a4ad-502e-4477-9258-a40b00be7488`,
    link: '/product/SHOE11',
    price: '$85.00',
    title: 'Izumi Bike Shoes',
  },
  {
    imageUrl:
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/49454f7d-6cc7-4382-a90b-2b539455899e',
    link: '/product/SHOE12',
    price: '$68.00',
    title: 'Giro Rumble Bike Shoe',
  },
  {
    imageUrl:
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/1091c71f-ca56-4309-aa30-bc64f4538a75',
    link: '/product/TOP3',
    price: '$99.00',
    title: 'Columbia Albany Jacket',
  },
  {
    imageUrl: '//cdn-sb.mozu.com/30294-50525/cms/50525/files/edfb022b-5b19-4dd2-a676-1469e9763828',
    link: '/product/TOP17',
    price: '$99.98',
    title: 'Hampton Nylon Jacket',
  },
  {
    imageUrl:
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/b7bf07dc-6267-4fe8-a56b-ddae1f1b0726',
    link: '/product/TOP16',
    price: '$120.00',
    title: 'Columbia TurtleZip',
  },
  {
    imageUrl: '//cdn-sb.mozu.com/30294-50525/cms/50525/files/10814a3b-2d83-42ec-a5f3-ea8441711042',
    link: '/product/test-6',
    price: '$59.98',
    title: 'Columbia Super Fleece',
  },
  {
    imageUrl:
      'https://cdn-sb.mozu.com/30294-50525/cms/50525/files/d1652945-81e7-45d3-99e5-ff4db88f597a',
    link: '/product/test-7',
    price: '$125.98',
    title: 'North Face Wind Breaker',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/0795ec7e-2bf1-45ac-bc7b-f19820ca1844`,
    link: '/product/test-8',
    price: '$59.00',
    title: 'Boreal Climbin Shoes',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/eea768aa-065b-4cf2-9af1-e0d492f21875`,
    link: '/product/test-9',
    price: '$130.00',
    title: 'North Face Thermal Jacket',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/2f81532c-0c60-4a86-9fd7-4e7ab5c0e9dd`,
    link: '/product/test-10',
    price: '$145.00',
    title: 'Keltly Redwing 50',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/0a6ac26f-13c6-4010-90d2-c376cdf08aad`,
    link: '/product/test-11',
    price: '$115.00',
    title: 'North Face Lounging',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/71a2fef4-2e6d-4dad-967f-efdbef566629`,
    link: '/product/test-12',
    price: '$255.00',
    title: 'Marmot Thor 3 Person Tent',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/83dff80f-e89c-4cec-9e3f-e75749b2c4bf`,
    link: '/product/test-13',
    price: '$110.00',
    title: 'CambelBak Aventura Hydration',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/33345f7d-a772-4a23-a11e-c755fa68b527`,
    link: '/product/test-14',
    price: '$160.98',
    title: 'Osprey Exos 58',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/eada5a6f-1610-44f4-85b5-22d516059027`,
    link: '/product/test-15',
    price: '$90.00',
    title: 'Checkered Jogging Jacket',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/6e955b45-e6ec-48a9-b4ab-cfa79947c20c`,
    link: '/product/test-16',
    price: '$105.00',
    title: 'Columbia Newton Jacket',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/f1868d15-363f-47ea-972f-510d7bd12fde`,
    link: '/product/test-17',
    price: '$355',
    title: 'MSR 5 Person Tent',
  },
  {
    imageUrl: `//cdn-sb.mozu.com/30294-50525/cms/50525/files/c1b58387-2719-43fe-be63-114e641a7257`,
    link: '/product/test-18',
    price: '$129.98',
    title: 'Columbian portland Fleece',
  },
  {
    imageUrl: `https://cdn-sb.mozu.com/30294-50525/cms/50525/files/a08200c3-d370-4655-afad-30cbb7fc5418`,
    link: '/product/test-19',
    price: '$69.98',
    title: 'Columbian Polar Vest',
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
