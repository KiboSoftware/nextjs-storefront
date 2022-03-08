import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Price from './Price'

export default {
  title: 'Common/Price',
  component: Price,
  argTypes: {
    size: { control: 'select' },
    fontWeight: { control: 'radio' },
  },
} as ComponentMeta<typeof Price>

const Template: ComponentStory<typeof Price> = (args) => <Price {...args} />

export const priceOnly = Template.bind({})
priceOnly.args = {
  price: '$120.00',
}

export const withSalePrice = Template.bind({})
withSalePrice.args = {
  price: '$120.00',
  salePrice: '$60.00',
}

export const withPriceRange = Template.bind({})
withPriceRange.args = {
  priceRange: {
    upper: '$120.00',
    lower: '$90.00',
  },
}
