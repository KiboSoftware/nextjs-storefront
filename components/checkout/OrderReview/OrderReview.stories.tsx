import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderReview from './OrderReview'
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
}
