import React from 'react'

import { ComponentMeta, ComponentStory } from '@storybook/react'

import CreateRoleTemplate from './CreateRoleTemplate'

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

const mockInitialData = {
  accounts: mockAccounts,
  hierarchy: [],
}

export default {
  title: 'B2B/CreateRoleTemplate',
  component: CreateRoleTemplate,
  argTypes: {
    onBackClick: { action: 'back clicked' },
  },
} as ComponentMeta<typeof CreateRoleTemplate>

const Template: ComponentStory<typeof CreateRoleTemplate> = (args) => (
  <CreateRoleTemplate {...args} />
)

export const Default = Template.bind({})
Default.args = {
  user: mockUser,
  initialData: mockInitialData,
}

export const WithoutAccounts = Template.bind({})
WithoutAccounts.args = {
  user: mockUser,
  initialData: { accounts: [], hierarchy: [] },
}

export const WithoutUser = Template.bind({})
WithoutUser.args = {
  user: undefined,
  initialData: mockInitialData,
}
