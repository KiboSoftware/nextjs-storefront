import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTreeLabel from './AccountHierarchyTreeLabel'
import { b2BAccountHierarchyResult, userResponseMock } from '@/__mocks__/stories'

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
  customerAccount: mockUser,
  mdScreen: true,
}

export const Purchaser = Template.bind({})
Purchaser.args = {
  currentAccount: b2BAccountHierarchyResult.accounts[0],
  customerAccount: mockUser,
  mdScreen: true,
}

export const NonPurchaser = Template.bind({})
NonPurchaser.args = {
  currentAccount: b2BAccountHierarchyResult.accounts[0],
  customerAccount: mockUser,
  mdScreen: true,
}
