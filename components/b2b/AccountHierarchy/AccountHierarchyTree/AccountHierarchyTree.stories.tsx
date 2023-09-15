import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTree from './AccountHierarchyTree'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'
import { buildAccountHierarchy } from '@/lib/helpers'
import { HierarchyTree } from '@/lib/types'

// Common
export default {
  title: 'B2B/AccountHierarchy/AccountHierarchyTree',
  component: AccountHierarchyTree,
} as ComponentMeta<typeof AccountHierarchyTree>

const Template: ComponentStory<typeof AccountHierarchyTree> = (args) => (
  <AccountHierarchyTree
    {...args}
    accounts={b2BAccountHierarchyResult.accounts as []}
    hierarchy={buildAccountHierarchy(b2BAccountHierarchyResult.accounts, 123) as HierarchyTree[]}
  />
)

export const Admin = Template.bind({})
Admin.args = {
  role: B2BRoles.ADMIN,
}

export const Purchaser = Template.bind({})
Purchaser.args = {
  role: B2BRoles.PURCHASER,
}

export const NonPurchaser = Template.bind({})
NonPurchaser.args = {
  role: B2BRoles.NON_PURCHASER,
}
