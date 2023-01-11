import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingMethod from './ShippingMethod'
import { orderMock } from '@/__mocks__/stories/orderMock'
import { shippingRateMock } from '@/__mocks__/stories/shippingRateMock'

export default {
  title: 'checkout/ShippingMethod',
  component: ShippingMethod,
  argTypes: { onChange: { action: 'onChange' }, onStoreLocatorClick: { action: 'clicked' } },
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
  onStoreLocatorClick: () => {
    console.log('change/select store clicked..')
  },
}
