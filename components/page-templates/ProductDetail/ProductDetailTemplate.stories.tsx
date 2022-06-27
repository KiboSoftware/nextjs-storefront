import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ProductCustomMock } from '../../../__mocks__/stories/ProductCustomMock'
import ProductDetailTemplate from './ProductDetailTemplate'

export default {
  title: 'Page Templates/Product Detail',
  component: ProductDetailTemplate,
} as ComponentMeta<typeof ProductDetailTemplate>

const Template: ComponentStory<typeof ProductDetailTemplate> = (args) => (
  <ProductDetailTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  product: ProductCustomMock,
  breadcrumbs: [
    {
      text: 'Home',
      link: '/',
    },
  ],
}

export const WithPriceRange = Template.bind({})
WithPriceRange.args = {
  product: {
    ...ProductCustomMock,
    price: {
      price: null,
      salePrice: null,
    },
    priceRange: { lower: { price: 60, salePrice: 20 }, upper: { price: 200, salePrice: 100 } },
  },
  breadcrumbs: [
    {
      text: 'Home',
      link: '/',
    },
  ],
}

export const Mobile = Template.bind({})
Mobile.args = {
  product: ProductCustomMock,
}
Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
