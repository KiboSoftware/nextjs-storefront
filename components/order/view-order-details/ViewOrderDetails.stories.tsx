import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewOrderDetails from './ViewOrderDetails'
import { orderMock } from '@/__mocks__/stories/orderMock'

export default {
  title: 'Order/ViewOrderDetails',
  component: ViewOrderDetails,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ViewOrderDetails>

const Template: ComponentStory<typeof ViewOrderDetails> = (args) => <ViewOrderDetails {...args} />

export const Common = Template.bind({})
Common.args = {
  order: orderMock.checkout,
  storePickupAddress:
    (orderMock.checkout.payments &&
      orderMock.checkout.payments[0]?.billingInfo?.billingContact?.address) ||
    undefined,
}
