import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserTable from './UserTable'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'User/UserTable',
  component: UserTable,
  argTypes: { onClick: { action: 'clicked' } },
} as ComponentMeta<typeof UserTable>

const style = {
  userStatus: {
    height: '12px',
    width: '12px',
    left: 0,
    top: '3.5px',
    borderRadius: '100px',
    marginRight: '8px',
  },
}

export const UserTableComponent: ComponentStory<typeof UserTable> = (args) => <UserTable />
