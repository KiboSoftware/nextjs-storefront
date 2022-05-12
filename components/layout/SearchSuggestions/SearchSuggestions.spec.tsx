import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SearchSuggestions.stories'

const { Common } = composeStories(stories)

const searchBarMock = () => <input data-testid="search-bar-component" name="searchInput" />
jest.mock('../../common/SearchBar/SearchBar', () => searchBarMock)
const listItemContentMock = () => <div data-testid="content-component" />
jest.mock('@/components/layout/Content/Content', () => listItemContentMock)
const listItemTitleMock = () => <div data-testid="title-component" />
jest.mock('@/components/layout/Title/Title', () => listItemTitleMock)
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
    expect(searchBar).toBeVisible()

    expect(screen.queryByTestId('content-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('title-component')).not.toBeInTheDocument()
  })
})
