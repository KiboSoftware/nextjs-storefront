import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Checkout from './Checkout'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const steps = ['details', 'shipping', 'payment', 'review']

// Common
export default {
  title: 'Page Templates/Checkout',
  component: Checkout,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <CheckoutStepProvider steps={steps}>
        <Story />
      </CheckoutStepProvider>
    ),
  ],
} as ComponentMeta<typeof Checkout>

const Template: ComponentStory<typeof Checkout> = (args) => <Checkout {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
}
