import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ContentTile.stories'

const { Common } = composeStories(stories)

describe('[Component] - Contenttile ', () => {
  const setup = () => render(<Common {...Common?.args} />)
  it('should render component', () => {
    setup()

    const tile = Common?.args?.largeTileProps || []
    const title = screen.getAllByText(tile[0].title)
    const subtitle = screen.getAllByText(tile[0].subtitle)
    const link1 = screen.getAllByText(tile[0].link1.title)

    expect(title[0]).toBeInTheDocument()
    expect(subtitle[0]).toBeInTheDocument()
    expect(link1[0]).toBeInTheDocument()
  })
})
