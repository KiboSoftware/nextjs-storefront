import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewUserDetailDialog from './ViewUserDetailDialog'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'

import { B2BUser } from '@/lib/gql/types'

export default {
  title: 'Dialogs/B2B/ViewUserDetailDialog',
  component: ViewUserDetailDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof ViewUserDetailDialog>

const Template: ComponentStory<typeof ViewUserDetailDialog> = ({ ...args }) => (
  <ViewUserDetailDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  b2BUser: customerB2BUserForPage0Mock?.items?.[0] as B2BUser,
}
