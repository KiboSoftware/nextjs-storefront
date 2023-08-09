import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTreeLabel from './AccountHierarchyTreeLabel'
import { userResponseMock } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'

// Common
export default {
  title: 'B2B/AccountHierarchy/AccountHierarchyTreeLabel',
  component: AccountHierarchyTreeLabel,
} as ComponentMeta<typeof AccountHierarchyTreeLabel>

const mockUser = userResponseMock

const Template: ComponentStory<typeof AccountHierarchyTreeLabel> = (args) => (
  <AccountHierarchyTreeLabel {...args} />
)

export const Admin = Template.bind({})
Admin.args = {
  label: mockUser.companyOrOrganization as string,
  // icons?: any
  role: B2BRoles.ADMIN,
}

export const Purchaser = Template.bind({})
Purchaser.args = {
  label: mockUser.companyOrOrganization as string,
  // icons?: any
  role: B2BRoles.PURCHASER,
}

export const NonPurchaser = Template.bind({})
NonPurchaser.args = {
  label: mockUser.companyOrOrganization as string,
  // icons?: any
  role: B2BRoles.NON_PURCHASER,
}
