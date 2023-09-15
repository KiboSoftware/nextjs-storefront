import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyChangeParentDialog from './AccountHierarchyChangeParentDialog'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

export default {
  title: 'Dialogs/B2B/AccountHierarchyChangeParentDialog',
  component: AccountHierarchyChangeParentDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof AccountHierarchyChangeParentDialog>

const Template: ComponentStory<typeof AccountHierarchyChangeParentDialog> = ({ ...args }) => (
  <AccountHierarchyChangeParentDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  accounts: b2BAccountHierarchyResult?.accounts,
  parentAccount: b2BAccountHierarchyResult?.accounts?.[1],
}
