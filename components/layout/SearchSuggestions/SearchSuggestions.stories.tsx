import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import { searchSuggestionResult } from '../../../__mocks__/stories/searchSuggestionResultMock'
import SearchSuggestions from './SearchSuggestions'

// Common
export default {
  title: 'Layout/SearchSuggestions',
  component: SearchSuggestions,
} as ComponentMeta<typeof SearchSuggestions>

const Template: ComponentStory<typeof SearchSuggestions> = (args) => <SearchSuggestions {...args} />

// Default
export const Common = Template.bind({})
Common.args = {
  searchSuggestionResult,
}
