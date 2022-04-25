import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Review.stories'

const { Common } = composeStories(stories)

describe('[components] Review', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const ReviewComponent = screen.getByText(/Review/i)

    expect(ReviewComponent).toBeVisible()
  })
})
