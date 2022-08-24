import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DeleteConfirmation from './DeleteConfirmation'

export default {
  title: 'Dialogs/MyAccount/DeleteConfirmation',
  component: DeleteConfirmation,
  argTypes: { onDelete: { action: 'onDelete' } },
} as ComponentMeta<typeof DeleteConfirmation>

const Template: ComponentStory<typeof DeleteConfirmation> = ({ ...args }) => (
  <DeleteConfirmation {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  contentText: 'Are you sure you want to delete ?',
}
