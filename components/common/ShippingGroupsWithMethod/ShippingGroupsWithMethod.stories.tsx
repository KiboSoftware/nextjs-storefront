import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingGroupsWithMethod from './ShippingGroupsWithMethod'
import { checkoutMock, checkoutGroupRatesMock } from '@/__mocks__/stories'

export default {
  title: 'Common/ShippingGroupsWithMethod',
  component: ShippingGroupsWithMethod,
  argTypes: {
    onUpdateCheckoutShippingMethod: {
      action: 'onChange',
    },
  },
} as ComponentMeta<typeof ShippingGroupsWithMethod>

const Template: ComponentStory<typeof ShippingGroupsWithMethod> = (args) => (
  <ShippingGroupsWithMethod {...args} />
)

export const Common = Template.bind({})

Common.args = {
  checkout: checkoutMock?.checkout,
  shippingMethods: checkoutGroupRatesMock?.checkoutShippingMethods,
  onUpdateCheckoutShippingMethod: () => console.log('select shipping rate called'),
}
