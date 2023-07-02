import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ListTable from './ListTable'
import { wishlistMock } from '@/__mocks__/stories'

function getDate(date: number) {
  const d = new Date(date)
  const dateString = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
  return dateString
}

const rows = wishlistMock.items.map((item: any) => {
  return {
    ...item,
    createBy: item.auditInfo.createBy,
    createDate: getDate(item.auditInfo.createDate),
  }
})

export default {
  title: 'Common/ListTable',
  component: ListTable,
} as ComponentMeta<typeof ListTable>

export const Template: ComponentStory<typeof ListTable> = (args) => <ListTable {...args} />

export const Common = Template.bind({})

Common.args = {
  rows,
}
