import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CategoryFilterByMobile.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] - CategoryFilterByMobile', () => {
  const onFilterByCloseMock = jest.fn()
  const setup = () => {
    render(<Common onFilterByClose={onFilterByCloseMock} />)
  }

  it('should render component', () => {
    setup()

    const heading = screen.getByRole('heading', { level: 1 })
    const clearAllButton = screen.getByRole('button', { name: /clear-all/ })
    const viewResultButton = screen.getByRole('button', { name: /view-results/ })

    expect(heading).toBeVisible()
    expect(clearAllButton).toBeInTheDocument()
    expect(viewResultButton).toBeInTheDocument()
  })
})
