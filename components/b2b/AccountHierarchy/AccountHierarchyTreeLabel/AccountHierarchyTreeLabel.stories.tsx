import React from 'react'

import { ListItemIcon } from '@mui/material'
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
  icons: <ListItemIcon></ListItemIcon>,
  label: mockUser.companyOrOrganization as string,
  role: B2BRoles.ADMIN,
  mdScreen: true,
}

export const Purchaser = Template.bind({})
Purchaser.args = {
  label: mockUser.companyOrOrganization as string,
  role: B2BRoles.PURCHASER,
  mdScreen: true,
}

export const NonPurchaser = Template.bind({})
NonPurchaser.args = {
  label: mockUser.companyOrOrganization as string,
  role: B2BRoles.NON_PURCHASER,
  mdScreen: true,
}
