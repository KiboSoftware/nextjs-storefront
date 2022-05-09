import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CategoryFilterBy.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - CategoryFilterBy', () => {
  const setup = () => {
    render(<Common />)
  }

  it('should render component', () => {
    setup()

    const title = screen.getByText(/Filter by/i)
    const plpFilters = screen.getAllByRole('heading', { level: 4 })
    const plpFiltersLabel = plpFilters.map((b) => b.textContent)
    const plpFiltersLabelMocks = Common.args?.facetList
      ?.filter(
        (c) =>
          c.facetType?.toLocaleLowerCase() === 'value' ||
          c.facetType?.toLocaleLowerCase() === 'rangequery'
      )
      .map((children) => children.label)

    expect(title).toBeVisible()
    expect(plpFiltersLabel).toEqual(plpFiltersLabelMocks)
  })
})
