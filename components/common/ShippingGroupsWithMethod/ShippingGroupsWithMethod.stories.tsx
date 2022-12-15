import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingGroupsWithMethod from './ShippingGroupsWithMethod'
import { checkoutMock } from '@/__mocks__/stories'

export default {
  title: 'Common/ShippingGroupsWithMethod',
  component: ShippingGroupsWithMethod,
  argTypes: {},
} as ComponentMeta<typeof ShippingGroupsWithMethod>

const Template: ComponentStory<typeof ShippingGroupsWithMethod> = (args) => (
  <ShippingGroupsWithMethod {...args} />
)

export const Common = Template.bind({})

Common.args = {
  checkout: checkoutMock.checkout,
  //@todo add other props here for testing
}
