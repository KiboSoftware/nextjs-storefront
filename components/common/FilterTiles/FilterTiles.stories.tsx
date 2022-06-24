import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterTiles from './FilterTiles'
import { appliedFiltersMock } from '@/__mocks__/stories/appliedFiltersMock'

export default {
  title: 'Common/FilterTiles',
  component: FilterTiles,
} as ComponentMeta<typeof FilterTiles>

const Template: ComponentStory<typeof FilterTiles> = (args) => <FilterTiles {...args} />

export const Tiles = Template.bind({})

Tiles.args = {
  appliedFilters: appliedFiltersMock,
}
