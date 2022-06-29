import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterOrders from './FilterOrders'

// Common
export default {
  title: 'Common/FilterOrders',
  component: FilterOrders,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof FilterOrders>

const Template: ComponentStory<typeof FilterOrders> = () => <FilterOrders />

// Default
export const Common = Template.bind({})
