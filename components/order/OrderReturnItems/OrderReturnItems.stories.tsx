import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderReturnItems from './OrderReturnItems'
import { orderMock } from '@/__mocks__/stories/orderMock'

export default {
  title: 'Order/OrderReturnItems',
  component: OrderReturnItems,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof OrderReturnItems>

const Template: ComponentStory<typeof OrderReturnItems> = (args) => <OrderReturnItems {...args} />

export const Common = Template.bind({})
Common.args = {
  order: orderMock.checkout,
  title: 'choose-items-to-return',
  onGoBackToOrderDetails: () => console.log('go back to to order details'),
}
