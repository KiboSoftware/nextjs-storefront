import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FacetItem from './FacetItem'

// Common
export default {
  title: 'product-listing/FacetItem',
  component: FacetItem,
} as ComponentMeta<typeof FacetItem>

const Template: ComponentStory<typeof FacetItem> = (args) => <FacetItem {...args} />

// Common
export const Common = Template.bind({})
Common.args = {
  filterValue: 'Tenant~color:grey',
  label: 'Nike',
  count: 132,
  isApplied: false,
}

// Selected
export const Selected = Template.bind({})
Selected.args = {
  ...Common.args,
  isApplied: true,
}
