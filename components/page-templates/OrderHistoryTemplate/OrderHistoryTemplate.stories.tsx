import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import OrderHistoryTemplate from './OrderHistoryTemplate'

// Common
export default {
  title: 'OrderHistoryTemplate/OrderHistoryTemplate',
  component: OrderHistoryTemplate,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof OrderHistoryTemplate>

const Template: ComponentStory<typeof OrderHistoryTemplate> = (args) => (
  <OrderHistoryTemplate {...args} />
)

// Default
const filters = ['m-1', 'm-6']

export const Common = Template.bind({})
Common.args = {
  queryFilters: filters,
}
