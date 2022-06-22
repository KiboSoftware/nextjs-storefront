import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ProductDataMock } from '../../../__mocks__/stories/ProductDataMock'
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
  product: ProductDataMock,
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
    ...ProductDataMock,
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
  product: ProductDataMock,
}
Mobile.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
