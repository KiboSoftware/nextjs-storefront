import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FilterTiles.stories'

const { Common } = composeStories(stories)

describe('[component] - FilterTiles', () => {
  it('should render component', () => {
    render(<Common />)

    const filterTiles = screen.getByText(/last 6 months/i)
    expect(filterTiles).toBeVisible()
  })
})
