import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterTiles from './FilterTiles'

// Common
export default {
  title: 'Common/FilterTiles',
  component: FilterTiles,
  argTypes: {
    onAccountTitleClick: { action: 'onAccountTitleClick' },
  },
} as ComponentMeta<typeof FilterTiles>

const Template: ComponentStory<typeof FilterTiles> = () => <FilterTiles />

// Default
export const Common = Template.bind({})
