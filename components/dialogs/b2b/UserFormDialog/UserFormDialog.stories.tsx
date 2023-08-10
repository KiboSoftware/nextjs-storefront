import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import UserFormDialog from './UserFormDialog'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { userGetters } from '@/lib/getters'

import { B2BUser } from '@/lib/gql/types'

export default {
  title: 'Dialogs/B2B/UserFormDialog',
  component: UserFormDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onCSave' },
  },
} as ComponentMeta<typeof UserFormDialog>

const customerB2BUsers: B2BUser[] = userGetters.getCustomerB2BUsers(
  customerB2BUserForPage0Mock?.items as B2BUser[]
)

const Template: ComponentStory<typeof UserFormDialog> = ({ ...args }) => (
  <UserFormDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  isEditMode: false,
  b2BUser: undefined,
}

export const WithProps = Template.bind({})
WithProps.args = {
  ...Common.args,
  isEditMode: true,
  formTitle: 'Edit user',
  b2BUser: customerB2BUsers[0],
}
