import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SearchSuggestions.stories'

const { Common } = composeStories(stories)

const searchBarMock = () => <input data-testid="search-bar-component" name="searchInput" />
jest.mock('../../common/SearchBar/SearchBar', () => searchBarMock)
jest.mock('../../../hooks', () => ({
  useDebounce: jest.fn(() => ''),
  useSearchSuggestions: jest.fn(() => ''),
}))

describe('[components] - SearchSuggestions', () => {
  const setup = () => {
    render(<Common />)
  }

  it('should render component', async () => {
    setup()

    const searchBar = screen.getByTestId('search-bar-component')
    const backdrop = screen.getByTestId('backdrop')
    const contentinfo = screen.queryByRole('contentinfo')

    expect(searchBar).toBeVisible()
    expect(backdrop).not.toBeVisible()
    expect(contentinfo).not.toBeInTheDocument()
  })
})
