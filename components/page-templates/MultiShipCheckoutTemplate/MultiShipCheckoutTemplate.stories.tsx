import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import MultiShipCheckoutTemplate from './MultiShipCheckoutTemplate'
import { checkoutMock } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context'
export default {
  title: 'Page Templates/MultiShip Checkout Template',
  component: MultiShipCheckoutTemplate,
  decorators: [
    (Story) => (
      <div>
        <div
          style={{ height: '50px', position: 'sticky', top: 0, background: 'white', zIndex: 2000 }}
        ></div>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof MultiShipCheckoutTemplate>

const Template: ComponentStory<typeof MultiShipCheckoutTemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
    <MultiShipCheckoutTemplate {...args} />
  </CheckoutStepProvider>
)

export const Common = Template.bind({})
Common.args = {
  checkout: checkoutMock.checkout,
  isMultiShipEnabled: true,
}
