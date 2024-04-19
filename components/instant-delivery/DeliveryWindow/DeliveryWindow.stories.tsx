import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DeliveryWindow from './DeliveryWindow'

export default {
  title: 'Cart/DeliveryWindow',
  component: DeliveryWindow,
  argTypes: { setStoreBoundary: { action: 'clicked' }, setDeliveryAddress: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DeliveryWindow>

const Template: ComponentStory<typeof DeliveryWindow> = (args) => <DeliveryWindow />

export const Common = Template.bind({})
Common.args = {}
