import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DeliveryInstructions from './DeliveryInstructions'

export default {
  title: 'Common/DeliveryInstructions',
  component: DeliveryInstructions,
  argTypes: { onAddInstructions: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DeliveryInstructions>

const Template: ComponentStory<typeof DeliveryInstructions> = (args) => (
  <DeliveryInstructions {...args} />
)

export const Common = Template.bind({})
Common.args = {
  placeHolder: 'Enter delivery instructions',
}
