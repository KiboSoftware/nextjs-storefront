import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CategoryFilterByMobile.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const CategoryFilterByMock = () => <div data-testid="category-filterby-component" />

jest.mock('../CategoryFilterBy/CategoryFilterBy', () => CategoryFilterByMock)

describe('[component] - CategoryFilterByMobile', () => {
  const setup = () => {
    render(<Common />)
  }

  it('should render component', () => {
    setup()

    const heading = screen.getByRole('heading', { level: 1 })
    const categoryFilterByComponent = screen.getByTestId('category-filterby-component')
    const clearAllButton = screen.getByRole('button', { name: /clear-all/ })
    const viewResultButton = screen.getByRole('button', { name: /view-results/ })

    expect(heading).toBeVisible()
    expect(categoryFilterByComponent).toBeInTheDocument()
    expect(clearAllButton).toBeInTheDocument()
    expect(viewResultButton).toBeInTheDocument()
  })
})
