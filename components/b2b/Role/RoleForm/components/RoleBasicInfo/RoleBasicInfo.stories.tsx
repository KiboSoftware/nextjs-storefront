import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import RoleBasicInfo, { RoleFormData } from './RoleBasicInfo'
import { mockB2BAccountsHierarchy } from '@/__mocks__/stories/b2bAccountMock'
import { StoryContainer } from '@/__mocks__/stories/storyHelpers'

import { B2BAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/RoleBasicInfo',
  component: RoleBasicInfo,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RoleBasicInfo>

// Shared default values for form
const defaultFormValues: RoleFormData = {
  roleName: '',
  parentAccount: '',
  accountScope: 'all-child',
  applyToFutureChildren: false,
  selectedAccounts: [],
  selectedPermissions: {},
}

// Shared helper for stories
const handleParentAccountChange = (value: string) => {
  console.log('Parent account changed to:', value)
}

const createRoleBasicInfoStory = (control: any, errors: any): React.ReactElement => (
  <StoryContainer>
    <RoleBasicInfo
      control={control}
      errors={errors}
      onParentAccountChange={handleParentAccountChange}
      accounts={mockB2BAccountsHierarchy}
    />
  </StoryContainer>
)

const Template: ComponentStory<typeof RoleBasicInfo> = () => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: defaultFormValues,
  })

  return createRoleBasicInfoStory(control, errors)
}

export const Default = Template.bind({})
Default.args = {
  accounts: mockB2BAccountsHierarchy,
}

export const WithPrefilledData: ComponentStory<typeof RoleBasicInfo> = () => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      ...defaultFormValues,
      roleName: 'Finance Manager',
      parentAccount: '1001',
    },
  })

  return createRoleBasicInfoStory(control, errors)
}

export const WithValidationErrors: ComponentStory<typeof RoleBasicInfo> = () => {
  const {
    control,
    formState: { errors },
    setError,
  } = useForm<RoleFormData>({
    defaultValues: defaultFormValues,
  })

  // Set validation errors for demonstration
  React.useEffect(() => {
    setError('roleName', {
      type: 'required',
      message: 'Role name is required',
    })
    setError('parentAccount', {
      type: 'required',
      message: 'Parent account must be selected',
    })
  }, [setError])

  return createRoleBasicInfoStory(control, errors)
}

export const NoAccounts = Template.bind({})
NoAccounts.args = {
  accounts: [],
}
