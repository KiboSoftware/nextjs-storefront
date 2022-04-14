import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Content from './Content'

export default {
  title: 'Add-To-Cart-Dialog/Content',
  component: Content,
} as ComponentMeta<typeof Content>

const Template: ComponentStory<typeof Content> = ({ ...args }) => <Content {...args} />

// Common
export const Common = Template.bind({})
Common.args = {
  fullfillmentOption: 'free',
  quantity: 2,
  subtotal: 219.99,
  tax: 13.73,
  total: 233.72,
}
