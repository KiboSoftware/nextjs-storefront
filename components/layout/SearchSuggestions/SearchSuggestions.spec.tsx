import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './SearchSuggestions.stories'

const { Common } = composeStories(stories)

const searchBarMock = () => <div data-testid="search-bar-component" />
jest.mock('@/components/common/SearchBar/SearchBar', () => searchBarMock)
jest.mock('../../../hooks', () => ({
  useDebounce: jest.fn(() => ''),
  useUpdateRoutes: jest.fn(() => ''),
}))

describe('[components] - SearchSuggestions', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()
    const searchBar = screen.getByTestId('search-bar-component')
    expect(searchBar).toBeVisible()
  })
})
