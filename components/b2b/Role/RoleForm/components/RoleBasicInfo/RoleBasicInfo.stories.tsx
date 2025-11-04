import React from 'react'

import { Box } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { useForm } from 'react-hook-form'

import RoleBasicInfo, { RoleFormData } from './RoleBasicInfo'

import { B2BAccount, CustomerAccount } from '@/lib/gql/types'

export default {
  title: 'B2B/Role/Components/RoleBasicInfo',
  component: RoleBasicInfo,
  parameters: {
    layout: 'padded',
  },
} as ComponentMeta<typeof RoleBasicInfo>

// Mock B2B Accounts data - Multi-level hierarchy
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
  {
    id: 1006,
    parentAccountId: 1003,
    taxId: '654987321',
    companyOrOrganization: 'Grandchild Company B1',
  },
  {
    id: 1007,
    parentAccountId: 1004,
    taxId: '147258369',
    companyOrOrganization: 'Great-Grandchild Company A1-1',
  },
  {
    id: 1008,
    parentAccountId: 1005,
    taxId: '258369147',
    companyOrOrganization: 'Great-Grandchild Company A2-1',
  },
]

// Mock Customer Account (User) data
const mockUser: CustomerAccount = {
  id: 1001,
  userId: '3e69cbd5f3694a76916e64451cb76968',
  firstName: 'John',
  lastName: 'Smith',
  emailAddress: 'john.smith@parentcorp.com',
  userName: 'john.smith@parentcorp.com',
  isAnonymous: false,
  companyOrOrganization: 'Parent Corporation',
}

// Mock Customer Account without company name
const mockUserWithoutCompany: CustomerAccount = {
  id: 1005,
  userId: '4f79dcdef4795b87a27e75562ec87079',
  firstName: 'Jane',
  lastName: 'Doe',
  emailAddress: 'jane.doe@example.com',
  userName: 'jane.doe@example.com',
  isAnonymous: false,
}

const Template: ComponentStory<typeof RoleBasicInfo> = (args) => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
  })

  const handleParentAccountChange = (value: string) => {
    console.log('Parent account changed to:', value)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <RoleBasicInfo
        {...args}
        control={control}
        errors={errors}
        onParentAccountChange={handleParentAccountChange}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  accounts: mockAccounts,
  user: mockUser,
}

export const WithPrefilledData: ComponentStory<typeof RoleBasicInfo> = (args) => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: 'Finance Manager',
      parentAccount: '1001',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
  })

  const handleParentAccountChange = (value: string) => {
    console.log('Parent account changed to:', value)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <RoleBasicInfo
        {...args}
        control={control}
        errors={errors}
        onParentAccountChange={handleParentAccountChange}
      />
    </Box>
  )
}

WithPrefilledData.args = {
  accounts: mockAccounts,
  user: mockUser,
}

export const WithValidationErrors: ComponentStory<typeof RoleBasicInfo> = (args) => {
  const {
    control,
    formState: { errors },
    setError,
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
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

  const handleParentAccountChange = (value: string) => {
    console.log('Parent account changed to:', value)
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <RoleBasicInfo
        {...args}
        control={control}
        errors={errors}
        onParentAccountChange={handleParentAccountChange}
      />
    </Box>
  )
}

WithValidationErrors.args = {
  accounts: mockAccounts,
  user: mockUser,
}

export const UserWithoutCompanyName = Template.bind({})
UserWithoutCompanyName.args = {
  accounts: mockAccounts,
  user: mockUserWithoutCompany,
}

export const NoAccounts = Template.bind({})
NoAccounts.args = {
  accounts: [],
  user: mockUser,
}

export const NoUser = Template.bind({})
NoUser.args = {
  accounts: mockAccounts,
  user: undefined,
}

export const EmptyState = Template.bind({})
EmptyState.args = {
  accounts: [],
  user: undefined,
}

export const MiddleLevelUser: ComponentStory<typeof RoleBasicInfo> = (args) => {
  const {
    control,
    formState: { errors },
  } = useForm<RoleFormData>({
    defaultValues: {
      roleName: '',
      parentAccount: '',
      accountScope: 'all-child',
      applyToFutureChildren: false,
      selectedAccounts: [],
      selectedPermissions: {},
    },
  })

  const handleParentAccountChange = (value: string) => {
    console.log('Parent account changed to:', value)
  }

  // User is at middle level (Child Company A)
  const middleLevelUser: CustomerAccount = {
    id: 1002,
    userId: '4f79dcdef4795b87a27e75562ec87079',
    firstName: 'Jane',
    lastName: 'Manager',
    emailAddress: 'jane.manager@childcompanya.com',
    userName: 'jane.manager@childcompanya.com',
    isAnonymous: false,
    companyOrOrganization: 'Child Company A',
  }

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <RoleBasicInfo
        {...args}
        control={control}
        errors={errors}
        onParentAccountChange={handleParentAccountChange}
        user={middleLevelUser}
      />
    </Box>
  )
}

MiddleLevelUser.args = {
  accounts: mockAccounts,
}
