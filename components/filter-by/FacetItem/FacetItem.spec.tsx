import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './FacetItem.stories'

const { Common } = composeStories(stories)

describe('[components] - FacetItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByTestId('label')
    const count = screen.getByTestId('count')

    // assert
    expect(checkbox).toBeInTheDocument()
    expect(label).toBeVisible()
    expect(count).toBeVisible()
  })
})
