import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Facet from './Facet'

// Common
export default {
  title: 'product-listing/Facet',
  component: Facet,
} as ComponentMeta<typeof Facet>

const Template: ComponentStory<typeof Facet> = (args) => <Facet {...args} />

// Common
export const Common = Template.bind({})

const values = [
  { value: 'nike', label: 'Nike', count: 132, isDisplayed: true },
  { value: 'adidas', label: 'Adidas', count: 112, isDisplayed: true },
  { value: 'asics', label: 'Asics', count: 54, isDisplayed: true },
  { value: 'brooks', label: 'Brooks', count: 39, isDisplayed: true },
  { value: 'under armour', label: 'Under Armour', count: 88, isDisplayed: true },
  { value: 'hoka', label: 'Hoka', count: 23, isDisplayed: true },

  { value: '7', label: 'Item 7', count: 70, isDisplayed: true },
  { value: '8', label: 'Item 8', count: 80, isDisplayed: true },
  { value: '9', label: 'Item 9', count: 90, isDisplayed: true },
  { value: '10', label: 'Item 10', count: 100, isDisplayed: true },
  { value: '11', label: 'Item 11', count: 110, isDisplayed: true },
  { value: '12', label: 'Item 12', count: 120, isDisplayed: true },
  { value: '13', label: 'Item 13', count: 130, isDisplayed: true },
]
Common.args = {
  numberOfItemsToShow: 6,
  label: 'Brand',
  values,
}
