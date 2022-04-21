import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { orderItems } from '../../../__mocks__/productItemListMockData'
import ProductItemList from './ProductItemList'
import DefaultImage from '@/public/product_placeholder.svg'

import type { CrProductOption } from '@/lib/gql/types'

const argsWithoutLabel = orderItems.map((item) => {
  return {
    image: item.product?.imageUrl || DefaultImage,
    name: item.product?.name || '',
    options: item.product?.options as Array<CrProductOption>,
  }
})

const argsWithLabel = orderItems.map((item) => {
  return {
    image: item.product?.imageUrl || DefaultImage,
    name: item.product?.name || '',
    options: item.product?.options as Array<CrProductOption>,
    qty: item?.quantity || 0,
    price: '$' + (item.product?.price?.price || 0).toString(),
    salePrice: '$' + (item.product?.price?.salePrice || 0).toString(),
  }
})

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
