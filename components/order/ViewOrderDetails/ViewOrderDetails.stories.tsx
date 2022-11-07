import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ViewOrderDetails from './ViewOrderDetails'
import { orderMock, orderReturnItemsMock } from '@/__mocks__/stories/orderMock'

export default {
  title: 'Order/ViewOrderDetails',
  component: ViewOrderDetails,
  argTypes: { onChange: { action: 'onChange' } },
} as ComponentMeta<typeof ViewOrderDetails>

const Template: ComponentStory<typeof ViewOrderDetails> = (args) => <ViewOrderDetails {...args} />

export const Common = Template.bind({})
Common.args = {
  order: orderMock.checkout,
  title: 'view-order-details',
}

export const WithReturnItemButton = Template.bind({})
WithReturnItemButton.args = {
  order: orderReturnItemsMock.createReturn,
  title: 'view-order-details',
}
