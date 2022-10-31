import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderReturnItemsDialog from './OrderReturnItemsDialog'
import { orderReturnItemsMock } from '@/__mocks__/stories/orderMock'

export default {
  title: 'Dialogs/OrderReturnItemsDialog',
  component: OrderReturnItemsDialog,
  argTypes: { closeModal: { action: 'closeModal' } },
} as ComponentMeta<typeof OrderReturnItemsDialog>

const Template: ComponentStory<typeof OrderReturnItemsDialog> = ({ ...args }) => (
  <OrderReturnItemsDialog {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  orderItems: orderReturnItemsMock?.createReturn?.items || [],
  reason: 'Damaged',
}
