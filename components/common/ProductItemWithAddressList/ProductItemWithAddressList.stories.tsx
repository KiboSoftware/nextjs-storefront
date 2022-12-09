import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProductItemWithAddressList from './ProductItemWithAddressList'
export default {
  title: 'Common/ProductItemWithAddressList',
  component: ProductItemWithAddressList,
  argTypes: {},
} as ComponentMeta<typeof ProductItemWithAddressList>

// Default Line Item
const Template: ComponentStory<typeof ProductItemWithAddressList> = (args) => (
  <ProductItemWithAddressList {...args} />
)

export const Common = Template.bind({})
