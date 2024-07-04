import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import GroupTransferList from './GroupTransferList'

// Common
export default {
  title: 'My Account/B2B/GroupTransferList',
  component: GroupTransferList,

  argTypes: {
    onAddRemoveGroups: { onAddRemoveGroups: { action: 'onAddRemoveGroups' } },
  },
} as ComponentMeta<typeof GroupTransferList>

const Template: ComponentStory<typeof GroupTransferList> = (args) => <GroupTransferList {...args} />

const groupsList = [
  {
    accountId: 1100,
    code: 'manager',
    name: 'Manager',
    description: 'Manager',
  },
  {
    accountId: 1100,
    code: 'admin',
    name: 'Admin',
    description: 'admin',
  },
]

const selectedGroups = [
  {
    accountId: 1100,
    code: 'employee',
    name: 'Employee',
    description: 'Employee',
  },
]

export const Common = Template.bind({})
Common.args = {
  groupsList: groupsList,
  selectedGroups: selectedGroups,
  isSubmitting: false,
}
