import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FacetItemList from './FacetItemList'

// Common
export default {
  title: 'product-listing/FacetItemList',
  component: FacetItemList,
} as ComponentMeta<typeof FacetItemList>

const Template: ComponentStory<typeof FacetItemList> = (args) => <FacetItemList {...args} />

// Common
export const Common = Template.bind({})

const itemList = [
  {
    label: 'Black',
    value: 'black',
    filterValue: 'Tenant~color:black',
    isDisplayed: true,
    count: 8,
    isApplied: false,
    childrenFacetValues: null,
  },
  {
    label: 'Blue',
    value: 'blue',
    filterValue: 'Tenant~color:blue',
    isDisplayed: true,
    count: 5,
    isApplied: false,
    childrenFacetValues: null,
  },
  {
    label: 'Green',
    value: 'green',
    filterValue: 'Tenant~color:green',
    isDisplayed: true,
    count: 2,
    isApplied: false,
    childrenFacetValues: null,
  },
  {
    label: 'Grey',
    value: 'grey',
    filterValue: '	',
    isDisplayed: true,
    count: 4,
    isApplied: false,
    childrenFacetValues: null,
  },
]
Common.args = {
  itemList,
}
