import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderStatusTemplate from './OrderStatusTemplate'

// Common
export default {
  title: 'OrderStatusTemplate/OrderStatusTemplate',
  component: OrderStatusTemplate,
} as ComponentMeta<typeof OrderStatusTemplate>

const Template: ComponentStory<typeof OrderStatusTemplate> = () => <OrderStatusTemplate />

// Default
export const Common = Template.bind({})
