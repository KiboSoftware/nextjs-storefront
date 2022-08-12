import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkout from './Checkout'
import { orderMock } from '@/__mocks__/stories/orderMock'

// Common
export default {
  title: 'Page Templates/Checkout',
  component: Checkout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(Story) => <Story />],
} as ComponentMeta<typeof Checkout>

const Template: ComponentStory<typeof Checkout> = (args) => <Checkout {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
}
