import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterOrders from './FilterOrders'
import { FacetTypeForHistory } from '@/lib/constants'

// Common
export default {
  title: 'Common/FilterOrders',
  component: FilterOrders,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof FilterOrders>

const Template: ComponentStory<typeof FilterOrders> = (args) => <FilterOrders {...args} />

const filters = [
  {
    label: 'Last 30 days',
    filterValue: 'm-1',
    count: 3,
    isApplied: true,
  },
  {
    label: 'Last 6 months',
    filterValue: 'm-6',
    count: 3,
    isApplied: true,
  },
]
// Default
export const Common = Template.bind({})
Common.args = {
  facetList: FacetTypeForHistory,
  appliedFilters: filters,
}
