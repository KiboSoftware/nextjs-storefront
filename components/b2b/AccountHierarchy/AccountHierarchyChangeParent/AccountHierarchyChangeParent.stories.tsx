import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyChangeParent from './AccountHierarchyChangeParent'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

export default {
  component: AccountHierarchyChangeParent,
  title: 'My Account/B2B/AccountHierarchyChangeParent',
  argTypes: {
    onClose: { action: 'onCancel' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyChangeParent>

const Template: ComponentStory<typeof AccountHierarchyChangeParent> = (args) => (
  <AccountHierarchyChangeParent {...args} />
)

// Account Hierarchy
export const Common = Template.bind({})
Common.args = {
  accounts: b2BAccountHierarchyResult?.accounts,
  parentAccount: b2BAccountHierarchyResult?.accounts?.[1],
}
