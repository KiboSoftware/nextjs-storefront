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
    label: 'last-30-days',
    filterValue: 'M-1',
    count: 0,
    isDisplayed: true,
    isApplied: true,
  },
  {
    label: 'last-6-months',
    filterValue: 'M-6',
    count: 0,
    isDisplayed: true,
    isApplied: true,
  },
]
// Default
export const Common = Template.bind({})
Common.args = {
  facetList: FacetTypeForHistory,
  appliedFilters: filters,
}
