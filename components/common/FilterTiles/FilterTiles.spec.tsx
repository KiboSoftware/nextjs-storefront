import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './FilterTiles.stories' // import all stories from the stories file

import type { FacetValue } from '@/lib/gql/types'

const { Tiles } = composeStories(stories)

describe('[components] Fulfillment Options Component', () => {
  const onSelectedTileRemovalMock = jest.fn()
  const setup = () => {
    const user = userEvent.setup()
    render(<Tiles onSelectedTileRemoval={onSelectedTileRemovalMock} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()

    const tilesLabel = Tiles?.args?.appliedFilters?.map((tile: FacetValue) => tile.label) || []

    const tilesLabelRegex = new RegExp(tilesLabel.join('|'), 'i')

    const tiles = screen.getAllByText(tilesLabelRegex)
    expect(tiles).toHaveLength(Tiles?.args?.appliedFilters?.length || 0)
  })

  it('should remove filter tile when users clicks on cross icon', async () => {
    const { user } = setup()
    const closeIcon = screen.getAllByTestId('CloseIcon')

    await user.click(closeIcon[0])
    expect(onSelectedTileRemovalMock).toHaveBeenCalled()
  })
})
