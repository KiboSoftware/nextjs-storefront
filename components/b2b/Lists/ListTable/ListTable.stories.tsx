import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListTable from './ListTable'
import { wishlistMock } from '@/__mocks__/stories'

const rows = wishlistMock.items

export default {
  title: 'My Account/ List Table',
  component: ListTable,
  argTypes: {
    onEditList: { action: 'onEditList' },
    onCopyList: { action: 'onCopyList' },
    onDeleteList: { action: 'onDeleteList' },
    onAddListToCart: { action: 'onAddToListCart' },
  },
} as ComponentMeta<typeof ListTable>

const Template: ComponentStory<typeof ListTable> = (args) => <ListTable {...args} />

export const Table = Template.bind({})

Table.args = {
  rows,
  isLoading: false,
}
