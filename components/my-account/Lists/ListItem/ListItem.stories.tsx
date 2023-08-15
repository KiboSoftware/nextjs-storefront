import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListItem from './ListItem'
import { wishlistMock } from '@/__mocks__/stories'

import { CrProductPrice } from '@/lib/gql/types'

export const lineItem = wishlistMock.items[0].items[0]

const item = {
  product: {
    productName: lineItem.product.name as string,
    productCode: lineItem.product.productCode as string,
    price: lineItem.product.price as CrProductPrice,
    productImage: lineItem.product.imageUrl as string,
    productImageAltText: lineItem.product.productCode as string,
    productDescription: '',
  },
  quantity: lineItem.quantity as number,
}

export default {
  title: 'My Account / List Item',
  component: ListItem,
  argTypes: {
    onChangeQuantity: { action: 'onEditFormToggle' },
    onDeleteItem: { action: 'onDeleteItem' },
  },
} as ComponentMeta<typeof ListItem>

const Template: ComponentStory<typeof ListItem> = (args) => <ListItem {...args} />

export const Common = Template.bind({})

Common.args = {
  item,
}
