import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import RoleForm from './RoleForm'

const mockUser = {
  id: 1001,
  companyOrOrganization: 'Acme Corporation',
  firstName: 'John',
  lastName: 'Doe',
  emailAddress: 'john.doe@acme.com',
}

const mockAccounts = [
  {
    id: 1001,
    companyOrOrganization: 'Acme Corporation',
    parentAccountId: null,
    isActive: true,
  },
  {
    id: 1002,
    companyOrOrganization: 'Acme East Division',
    parentAccountId: 1001,
    isActive: true,
  },
  {
    id: 1003,
    companyOrOrganization: 'Acme West Division',
    parentAccountId: 1001,
    isActive: true,
  },
  {
    id: 1004,
    companyOrOrganization: 'Acme Subsidiary Inc',
    parentAccountId: 1001,
    isActive: true,
  },
]

export default {
  title: 'B2B/Role/RoleForm',
  component: RoleForm,
  argTypes: {
    onSave: { action: 'saved' },
    onCancel: { action: 'cancelled' },
  },
} as ComponentMeta<typeof RoleForm>

const Template: ComponentStory<typeof RoleForm> = (args) => <RoleForm {...args} />

export const Default = Template.bind({})
Default.args = {
  user: mockUser,
  accounts: mockAccounts,
}

export const WithoutAccounts = Template.bind({})
WithoutAccounts.args = {
  user: mockUser,
  accounts: [],
}

export const WithoutUser = Template.bind({})
WithoutUser.args = {
  user: undefined,
  accounts: mockAccounts,
}
