import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderReview from './OrderReview'
import { checkoutMock } from '@/__mocks__/stories'
import { orderMock } from '@/__mocks__/stories/orderMock'

// Common
export default {
  title: 'Checkout/OrderReview',
  component: OrderReview,
  argTypes: { onHandleEditAction: { action: 'clicked' } },
} as ComponentMeta<typeof OrderReview>

const Template: ComponentStory<typeof OrderReview> = (args) => <OrderReview {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  checkout: orderMock.checkout,
  isMultiShipEnabled: false,
}

//With multi-ship enabled
export const WithMultiShippingAddresses = Template.bind({})
WithMultiShippingAddresses.args = {
  checkout: checkoutMock.checkout,
  isMultiShipEnabled: true,
}
