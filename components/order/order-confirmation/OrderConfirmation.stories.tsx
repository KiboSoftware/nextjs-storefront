import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderConfirmation from './OrderConfirmation'
import { orderMock } from '@/__mocks__/stories/orderMock'

export default {
  title: 'Order/OrderConfirmation',
  component: OrderConfirmation,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof OrderConfirmation>

const Template: ComponentStory<typeof OrderConfirmation> = (args) => <OrderConfirmation {...args} />

export const Common = Template.bind({})
Common.args = {
  order: orderMock.checkout,
}
