import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import InstantDeliveryTemplate from './InstantDeliveryTemplate'

export default {
  title: 'Cart/InstantDeliveryTemplate',
  component: InstantDeliveryTemplate,
  argTypes: { setStoreBoundary: { action: 'clicked' }, setDeliveryAddress: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof InstantDeliveryTemplate>

const Template: ComponentStory<typeof InstantDeliveryTemplate> = (args) => (
  <InstantDeliveryTemplate {...args} />
)

export const Common = Template.bind({})
Common.args = {
  initialDeliveryAddress: undefined,
  onInstantDelivery: undefined,
}
