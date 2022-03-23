import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FacetItem from './FacetItem'

// Common
export default {
  title: 'Filter-By/FacetItem',
  component: FacetItem,
} as ComponentMeta<typeof FacetItem>

const Template: ComponentStory<typeof FacetItem> = (args) => <FacetItem {...args} />

// Default
export const Default = Template.bind({})
Default.args = {
  filterValue: 'Tenant~color:grey',
  label: 'Nike',
  count: 132,
}
