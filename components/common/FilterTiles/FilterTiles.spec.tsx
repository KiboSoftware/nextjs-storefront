import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import * as stories from './FilterTiles.stories' // import all stories from the stories file

const { Tiles } = composeStories(stories)

describe('[components] Fulfillment Options Component', () => {
  const setup = () => {
    render(<Tiles />)
  }

  it('should render component', () => {
    setup()

    const tilesLabel = Tiles?.args?.appliedFilters?.map((tile) => tile.label) || []

    const tilesLabelRegex = new RegExp(tilesLabel.join('|'), 'i')

    const tilesLabelss = screen.getAllByText(tilesLabelRegex)

    expect(tilesLabelss).toHaveLength(Tiles?.args?.appliedFilters?.length || 0)
  })
})
