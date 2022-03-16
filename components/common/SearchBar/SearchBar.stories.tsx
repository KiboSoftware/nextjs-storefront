import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchBar from './SearchBar'

// Common
export default {
  title: 'Common/SearchBar',
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>

const Template: ComponentStory<typeof SearchBar> = (args) => <SearchBar {...args} />

// Default
export const Default = Template.bind({})
Default.args = {
  placeHolder: 'Search Brand',
  searchTerm: '',
  onSearch: () => {
    /*parent will handle SearchBar*/
  },
  childInputRef: undefined,
  showClearButton: false,
}

// WithCancelButton
export const WithCancelButton = Template.bind({})
WithCancelButton.args = {
  ...Default.args,
  showClearButton: true,
}
