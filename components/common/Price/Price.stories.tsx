import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Price from './Price'

export default {
  title: 'Common/Price',
  component: Price,
} as ComponentMeta<typeof Price>

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />

export const PriceOnly = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
PriceOnly.args = {
  price: '$120.0',
}

export const WithSalePrice = Template.bind({})
WithSalePrice.args = {
  price: '$120.0',
  salePrice: '$60.0',
}

export const WithPriceRange = Template.bind({})
WithPriceRange.args = {
  priceRange: {
    upper: {
      price: '$220.00',
      salePrice: '$160.00',
    },
    lower: {
      price: '$120.00',
      salePrice: '$60.00',
    },
  },
}
