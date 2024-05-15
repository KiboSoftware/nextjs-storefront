import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import DeliveryAddress from './DeliveryAddress'

export default {
  title: 'Cart/DeliveryAddress',
  component: DeliveryAddress,
  argTypes: { setStoreBoundary: { action: 'clicked' }, setDeliveryAddress: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof DeliveryAddress>

const Template: ComponentStory<typeof DeliveryAddress> = (args) => <DeliveryAddress {...args} />

export const Common = Template.bind({})
Common.args = {
  instantDelivery: {
    storeBoundary: undefined,
    address: undefined,
  },
}
