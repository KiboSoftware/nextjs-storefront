import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import Search from './Search'

// Common
export default {
  title: 'Common/Search',
  component: Search,
} as ComponentMeta<typeof Search>

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />

// Default
export const Default = Template.bind({})
Default.args = {
  searchTerm: '',
  onSearch: () => {
    /*parent will handle search*/
  },
  facetName: 'Brand',
  childInputRef: undefined,
  showClearButton: false,
}

// WithCancelButton
export const WithCancelButton = Template.bind({})
WithCancelButton.args = {
  ...Default.args,
  showClearButton: true,
}
