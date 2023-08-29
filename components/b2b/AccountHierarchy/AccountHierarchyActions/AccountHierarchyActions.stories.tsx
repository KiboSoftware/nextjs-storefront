import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyActions from './AccountHierarchyActions'
import { B2BRoles } from '@/lib/constants'

// Common
export default {
  title: 'B2B/AccountHierarchy/AccountHierarchyActions',
  argTypes: {
    onBuyersClick: { action: 'onBuyerClick' },
    onQuotesClick: { action: 'onQuotesClick' },
    onAdd: { action: 'onAdd' },
    onEdit: { action: 'onEdit' },
    onView: { action: 'onView' },
  },
  component: AccountHierarchyActions,
} as ComponentMeta<typeof AccountHierarchyActions>

const Template: ComponentStory<typeof AccountHierarchyActions> = (args) => (
  <AccountHierarchyActions {...args} />
)

export const Common = Template.bind({})
Common.args = {
  role: B2BRoles.ADMIN,
  mdScreen: true,
}
