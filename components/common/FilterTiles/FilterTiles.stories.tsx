import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import FilterTiles from './FilterTiles'
import { facetValueMock } from '@/__mocks__/stories/facetValueMock'

export default {
  title: 'Common/FilterTiles',
  component: FilterTiles,
} as ComponentMeta<typeof FilterTiles>

const Template: ComponentStory<typeof FilterTiles> = (args) => <FilterTiles {...args} />

export const Tiles = Template.bind({})

Tiles.args = {
  appliedFilters: facetValueMock,
}
