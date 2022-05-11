import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { searchSuggestionResult } from '../../../../../__mocks__/stories/searchSuggestionResultMock'
import * as stories from '../../../../../components/layout/SearchSuggestions/SearchSuggestions.stories'

const { Common } = composeStories(stories)

describe('[components] - SearchSuggestions Integration', () => {
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

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const backdrop = screen.getByTestId('backdrop')

    expect(input).toBeVisible()
    expect(backdrop).not.toBeVisible()
  })

  it('should display user entered text on search bar input', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')

    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)
  })

  it('should display search suggestion when user entered the text on search bar', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const suggestionModal = await screen.findByRole('contentinfo')
    const suggestions = await screen.findByText('suggestions')
    const categories = await screen.findByText('categories')
    const separator = await screen.findByRole('separator')
    expect(suggestionModal).toBeVisible()
    expect(suggestions).toBeVisible()
    expect(categories).toBeVisible()
    expect(separator).toBeInTheDocument()

    const count = searchSuggestions.suggestionGroups?.length || 0
    expect(screen.getAllByRole('group')).toHaveLength(count)
  })

  it('should display backdrop when search suggustion opens', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    const suggestions = await screen.findByText('suggestions')
    expect(suggestions).toBeVisible()
    const backdrop = await screen.findByTestId('backdrop')
    expect(backdrop).toBeVisible()
  })

  it('should clear the search input and close the search suggestion when user clicks on cross button', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const clearButton = screen.getByRole('button', { name: 'clear-search' })
    userEvent.type(input, userEnteredText)

    expect(input).toHaveValue(userEnteredText)
    expect(clearButton).toBeEnabled()
    userEvent.click(clearButton)

    expect(input).toHaveValue('')
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })

  it('should close search suggestion when user clears the search text', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    userEvent.type(input, userEnteredText)

    const suggestionModal = await screen.findByRole('contentinfo')
    expect(suggestionModal).toBeVisible()

    userEvent.clear(input)
    expect(input).toHaveValue('')
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })

  it('should close search suggestion when user clicks on backdrop', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const backdrop = await screen.findByTestId('backdrop')
    userEvent.type(input, userEnteredText)

    expect(input).toHaveValue(userEnteredText)
    userEvent.click(backdrop)
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })
})
