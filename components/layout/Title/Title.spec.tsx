import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './Title.stories'

const { Common } = composeStories(stories)

describe('[components] - Title', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', async () => {
    setup()
    const suggestions = screen.getByText('suggestions')
    expect(suggestions).toBeVisible()
  })
})
