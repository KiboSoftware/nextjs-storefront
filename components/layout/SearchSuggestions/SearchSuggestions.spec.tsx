import React from 'react'

import '@testing-library/jest-dom'
import { InputBase } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { searchSuggestionResult } from '../../../__mocks__/stories/searchSuggestionResultMock'
import * as stories from './SearchSuggestions.stories'

const { Common } = composeStories(stories)

// const onChangMock = jest.fn()
// const searchBarMock = () => (
//   <InputBase data-testid="search-bar-component" name="searchInput" onChange={onChangMock} />
// )
// jest.mock('../../common/SearchBar/SearchBar', () => searchBarMock)
const listItemContentMock = () => <div data-testid="content-component" />
jest.mock('@/components/layout/Content/Content', () => listItemContentMock)
const listItemTitleMock = () => <div data-testid="title-component" />
jest.mock('@/components/layout/Title/Title', () => listItemTitleMock)

// jest.mock('../../../hooks', () => ({
//   useDebounce: jest.fn(() => ''),
//   useSearchSuggestions: jest.fn(() => ''),
// }))

describe('[components] - SearchSuggestions', () => {
  const userEnteredText = 'T'
  const searchSuggestions = searchSuggestionResult

  const setup = () => {
    render(<Common />)

    return {
      searchSuggestions,
    }
  }

  it('should render component', async () => {
    setup()

    // const searchBar = screen.getByTestId('search-bar-component')
    // expect(searchBar).toBeVisible()

    const input = screen.getByRole('textbox', { name: /search-input/i })
    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const suggestionModal = await screen.findByRole('contentinfo')
    expect(suggestionModal).toBeVisible()

    expect(screen.getAllByTestId('content-component')).toHaveLength(7)
    const count = searchSuggestions.suggestionGroups?.length || 0
    expect(screen.getAllByTestId('title-component')).toHaveLength(count)
  })
})
