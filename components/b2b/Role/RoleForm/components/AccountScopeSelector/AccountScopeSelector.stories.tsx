import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import AccountScopeSelector from './AccountScopeSelector'
import { RoleFormData } from '../RoleBasicInfo/RoleBasicInfo'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/AccountScopeSelector',
  component: AccountScopeSelector,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof AccountScopeSelector>

// Mock B2B Accounts data
const mockAccounts: B2BAccount[] = [
  {
    id: 1001,
    parentAccountId: null,
    taxId: '123456789',
    companyOrOrganization: 'Parent Corporation',
  },
  {
    id: 1002,
    parentAccountId: 1001,
    taxId: '987654321',
    companyOrOrganization: 'Child Company A',
  },
  {
    id: 1003,
    parentAccountId: 1001,
    taxId: '456789123',
    companyOrOrganization: 'Child Company B',
  },
  {
    id: 1004,
    parentAccountId: 1002,
    taxId: '789123456',
    companyOrOrganization: 'Grandchild Company A1',
  },
  {
    id: 1005,
    parentAccountId: 1002,
    taxId: '321654987',
    companyOrOrganization: 'Grandchild Company A2',
  },
]

const Template: ComponentStory<typeof AccountScopeSelector> = (args) => {
  const { control } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '1001',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
  })

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <AccountScopeSelector {...args} control={control} />
    </Box>
  )
}

export const WithChildAccounts = Template.bind({})
WithChildAccounts.args = {
  hasChildAccounts: true,
  selectedAccountsLength: 2,
  parentAccount: '1001',
  accounts: mockAccounts,
}

export const WithoutChildAccounts = Template.bind({})
WithoutChildAccounts.args = {
  hasChildAccounts: false,
  selectedAccountsLength: 0,
  parentAccount: '1001',
  accounts: [mockAccounts[0]], // Only parent account
}

export const NoSelectedAccounts = Template.bind({})
NoSelectedAccounts.args = {
  hasChildAccounts: true,
  selectedAccountsLength: 0,
  parentAccount: '1001',
  accounts: mockAccounts,
}

export const ManySelectedAccounts = Template.bind({})
ManySelectedAccounts.args = {
  hasChildAccounts: true,
  selectedAccountsLength: 4,
  parentAccount: '1001',
  accounts: mockAccounts,
}

export const NoAccounts = Template.bind({})
NoAccounts.args = {
  hasChildAccounts: false,
  selectedAccountsLength: 0,
  parentAccount: '',
  accounts: [],
}
