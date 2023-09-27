import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTree from './AccountHierarchyTree'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
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
Admin.args = {}

export const Purchaser = Template.bind({})

export const NonPurchaser = Template.bind({})
