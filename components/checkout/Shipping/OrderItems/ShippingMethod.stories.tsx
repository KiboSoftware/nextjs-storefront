import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingMethod from './ShippingMethod'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { shippingRateMock } from '@/__mocks__/stories/shippingRateMock'

export default {
  title: 'checkout/checkout/Shipping/OrderItems',
  component: ShippingMethod,
  argTypes: { onChange: { action: 'onChange' }, onClickStoreLocator: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ShippingMethod>

const orderItems = orderMock?.checkout?.items

// Default Line Item
const Template: ComponentStory<typeof ShippingMethod> = (args) => {
  return <ShippingMethod {...args} />
}

export const Common = Template.bind({})

Common.args = {
  shipItems: orderItems?.filter((item) => item?.fulfillmentMethod === 'Ship'),
  pickupItems: orderItems?.filter((item) => item?.fulfillmentMethod === 'Pickup'),
  orderShipmentMethods: shippingRateMock.orderShipmentMethods,
  onClickStoreLocator: () => {
    console.log('change/select store clicked..')
  },
}
