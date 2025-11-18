import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import AccountScopeSelector from './AccountScopeSelector'
import { RoleFormData } from '../RoleBasicInfo/RoleBasicInfo'

export default {
  title: 'B2B/Role/Components/AccountScopeSelector',
  component: AccountScopeSelector,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof AccountScopeSelector>

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
}

export const WithoutChildAccounts = Template.bind({})
WithoutChildAccounts.args = {
  hasChildAccounts: false,
}
