import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewAccountDetailsDialog from './ViewAccountDetailsDialog'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'

export default {
  title: 'Dialogs/B2B/ViewAccountDetailsDialog',
  component: ViewAccountDetailsDialog,
  argTypes: {
    onClose: { action: 'onClose' },
    onSave: { action: 'onSave' },
  },
} as ComponentMeta<typeof ViewAccountDetailsDialog>

const Template: ComponentStory<typeof ViewAccountDetailsDialog> = ({ ...args }) => (
  <ViewAccountDetailsDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  b2BAccount: b2BAccountHierarchyResult?.accounts?.[1],
}
