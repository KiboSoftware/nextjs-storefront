import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListTable from './ListTable'
import { wishlistMock } from '@/__mocks__/stories'

import { Maybe } from '@/lib/gql/types'
const rows = wishlistMock.items

export default {
  title: 'My Account/ List Table',
  component: ListTable,
  argTypes: {
    onEditList: { action: 'onEditList' },
    onCreateList: { action: 'onCreateList' },
    onDeleteList: { action: 'onDeleteList' },
  },
} as ComponentMeta<typeof ListTable>

const Template: ComponentStory<typeof ListTable> = (args) => <ListTable {...args} />

export const Table = Template.bind({})

Table.args = {
  rows,
  isLoading: false,
}
