import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import InstantDeliveryDialog from './InstantDeliveryDialog'

export default {
  title: 'Dialogs/InstantDeliveryDialog',
  component: InstantDeliveryDialog,
  argTypes: { closeModal: { action: 'closeModal' } },
} as ComponentMeta<typeof InstantDeliveryDialog>

const Template: ComponentStory<typeof InstantDeliveryDialog> = ({ ...args }) => (
  <InstantDeliveryDialog {...args} />
)

// Common
export const Common = Template.bind({})
