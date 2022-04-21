import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { argsWithoutLabel, argsWithLabel } from '../../../__mocks__/productItemListMockData'
import ProductItemList from './ProductItemList'

export default {
  title: 'Common/ProductItemList',
  component: ProductItemList,
  argTypes: {},
} as ComponentMeta<typeof ProductItemList>

// Default Line Item
const Template: ComponentStory<typeof ProductItemList> = (args) => <ProductItemList {...args} />

// Show Price below the product name
export const Common = Template.bind({})
Common.args = {
  items: [...argsWithoutLabel],
}

// Show Price below the product name
export const WithLabel = Template.bind({})
WithLabel.args = {
  items: [...argsWithLabel],
}
