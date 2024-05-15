import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { DeliveryWindow } from './DeliveryWindow'

export default {
  title: 'Cart/DeliveryWindow',
  component: DeliveryWindow,
  argTypes: { setDeliveryDateAndWindow: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DeliveryWindow>

const Template: ComponentStory<typeof DeliveryWindow> = (args) => <DeliveryWindow {...args} />

export const Common = Template.bind({})
Common.args = {
  instantDelivery: {
    storeBoundary: ['003', '002', '001'],
  },
}
