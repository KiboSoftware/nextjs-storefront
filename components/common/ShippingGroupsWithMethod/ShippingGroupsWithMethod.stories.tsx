import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ShippingGroupsWithMethod from './ShippingGroupsWithMethod'

export default {
  title: 'Common/ShippingGroupsWithMethod',
  component: ShippingGroupsWithMethod,
  argTypes: {},
} as ComponentMeta<typeof ShippingGroupsWithMethod>

// Default Line Item
const Template: ComponentStory<typeof ShippingGroupsWithMethod> = (args) => (
  <ShippingGroupsWithMethod {...args} />
)

export const Common = Template.bind({})
