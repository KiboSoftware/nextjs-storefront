import { ComponentStory, ComponentMeta } from '@storybook/react'

import {
  shipItems,
  pickupItems,
  getShippingRates,
} from '../../../../__mocks__/productItemListMockData'
import ShippingMethod from './ShippingMethod'

export default {
  title: 'checkout/checkout/Shipping/OrderItems',
  component: ShippingMethod,
  argTypes: { onChange: { action: 'onChange' }, onClickStoreLocator: { action: 'clicked' } },
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof ShippingMethod>

// Default Line Item
const Template: ComponentStory<typeof ShippingMethod> = (args) => {
  return <ShippingMethod {...args} />
}

export const Common = Template.bind({})

Common.args = {
  shipItems: shipItems,
  pickupItems: pickupItems,
  orderShipmentMethods: getShippingRates.orderShipmentMethods,
  onClickStoreLocator: () => {
    console.log('change/select store clicked..')
  },
}
