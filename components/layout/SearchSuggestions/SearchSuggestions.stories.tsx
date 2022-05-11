import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SearchSuggestions from './SearchSuggestions'

// Common
export default {
  title: 'Layout/SearchSuggestions',
  component: SearchSuggestions,
} as ComponentMeta<typeof SearchSuggestions>

const Template: ComponentStory<typeof SearchSuggestions> = () => <SearchSuggestions />

// Default
export const Common = Template.bind({})
