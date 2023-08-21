import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListItem from './ListItem'
import { wishlistMock } from '@/__mocks__/stories'

export const lineItem = wishlistMock.items[0].items[0]

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
  item: lineItem,
}
