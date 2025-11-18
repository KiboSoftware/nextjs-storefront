import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ManageRolesTemplate from './ManageRolesTemplate'
import {
  rolesMock,
  mockCustomerAccount,
  systemRolesOnlyMock,
  customRolesOnlyMock,
  emptyRolesMock,
  manyRolesMock,
  longRoleNamesMock,
  multipleAccountsRolesMock,
  specialCharacterRolesMock,
} from '@/__mocks__/stories'

export default {
  title: 'Page Templates/B2B/ManageRolesTemplate',
  component: ManageRolesTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof ManageRolesTemplate>

const Template: ComponentStory<typeof ManageRolesTemplate> = (args) => (
  <ManageRolesTemplate {...args} />
)

// Common story with initial data
export const Common = Template.bind({})
Common.args = {
  customerAccount: mockCustomerAccount,
  initialData: rolesMock,
}

// Story with only system roles
export const WithSystemRolesOnly = Template.bind({})
WithSystemRolesOnly.args = {
  customerAccount: mockCustomerAccount,
  initialData: systemRolesOnlyMock,
}

// Story with only custom roles
export const WithCustomRolesOnly = Template.bind({})
WithCustomRolesOnly.args = {
  customerAccount: mockCustomerAccount,
  initialData: customRolesOnlyMock,
}

// Story with mixed system and custom roles
export const WithMixedRoles = Template.bind({})
WithMixedRoles.args = {
  customerAccount: mockCustomerAccount,
  initialData: rolesMock,
}

// Story with empty roles list
export const WithEmptyRoles = Template.bind({})
WithEmptyRoles.args = {
  customerAccount: mockCustomerAccount,
  initialData: emptyRolesMock,
}

// Story with many roles (pagination scenario)
export const WithManyRoles = Template.bind({})
WithManyRoles.args = {
  customerAccount: mockCustomerAccount,
  initialData: manyRolesMock,
}

// Story with roles having long names
export const WithLongRoleNames = Template.bind({})
WithLongRoleNames.args = {
  customerAccount: mockCustomerAccount,
  initialData: longRoleNamesMock,
}

// Story with roles across multiple accounts
export const WithMultipleAccountsPerRole = Template.bind({})
WithMultipleAccountsPerRole.args = {
  customerAccount: mockCustomerAccount,
  initialData: multipleAccountsRolesMock,
}

// Story with special characters in role names
export const WithSpecialCharactersInNames = Template.bind({})
WithSpecialCharactersInNames.args = {
  customerAccount: mockCustomerAccount,
  initialData: specialCharacterRolesMock,
}

// Story without customer account (edge case)
export const WithoutCustomerAccount = Template.bind({})
WithoutCustomerAccount.args = {
  initialData: rolesMock,
}

// Story without initial data (loading from API)
export const WithoutInitialData = Template.bind({})
WithoutInitialData.args = {
  customerAccount: mockCustomerAccount,
}
