import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTreeLabel from './AccountHierarchyTreeLabel'
import { b2BAccountHierarchyResult, userResponseMock } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'

// Common
export default {
  title: 'B2B/AccountHierarchy/AccountHierarchyTreeLabel',
  component: AccountHierarchyTreeLabel,
  argTypes: {
    handleAddAccount: { action: 'handleAddAccount' },
    handleEditAccount: { action: 'handleEditAccount' },
    handleChangeParent: { action: 'handleChangeParent' },
    handleBuyersBtnClick: { action: 'handleBuyersBtnClick' },
    handleQuotesBtnClick: { action: 'handleQuotesBtnClick' },
  },
} as ComponentMeta<typeof AccountHierarchyTreeLabel>

const mockUser = userResponseMock

const Template: ComponentStory<typeof AccountHierarchyTreeLabel> = (args) => (
  <AccountHierarchyTreeLabel {...args} />
)

export const Admin = Template.bind({})
Admin.args = {
  currentAccount: b2BAccountHierarchyResult.accounts[0],
  accounts: b2BAccountHierarchyResult?.accounts,
  customerAccount: mockUser,
  role: B2BRoles.ADMIN,
  mdScreen: true,
}

export const Purchaser = Template.bind({})
Purchaser.args = {
  currentAccount: b2BAccountHierarchyResult.accounts[0],
  accounts: b2BAccountHierarchyResult?.accounts,
  customerAccount: mockUser,
  role: B2BRoles.PURCHASER,
  mdScreen: true,
}

export const NonPurchaser = Template.bind({})
NonPurchaser.args = {
  currentAccount: b2BAccountHierarchyResult.accounts[0],
  accounts: b2BAccountHierarchyResult?.accounts,
  customerAccount: mockUser,
  role: B2BRoles.NON_PURCHASER,
  mdScreen: true,
}
