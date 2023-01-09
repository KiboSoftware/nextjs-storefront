import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import StandardShipCheckoutTemplate from './StandardShipCheckoutTemplate'
import { orderMock } from '@/__mocks__/stories'
import { CheckoutStepProvider } from '@/context'
export default {
  title: 'Page Templates/StandardShip Checkout Template',
  component: StandardShipCheckoutTemplate,
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
} as ComponentMeta<typeof StandardShipCheckoutTemplate>

const Template: ComponentStory<typeof StandardShipCheckoutTemplate> = (args) => (
  <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
    <StandardShipCheckoutTemplate {...args} />
  </CheckoutStepProvider>
)

export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  isMultiShipEnabled: false,
}
