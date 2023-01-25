import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mockRouter from 'next-router-mock'

import { searchSuggestionResultMock } from '@/__mocks__/stories/searchSuggestionResultMock'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/layout/SearchSuggestions/SearchSuggestions.stories'

const { Common } = composeStories(stories)

describe('[components] - SearchSuggestions Integration', () => {
  const userEnteredText = 'T'
  const searchSuggestions = searchSuggestionResultMock

  const setup = () => {
    const user = userEvent.setup()
    renderWithQueryClient(<Common />)

    return {
      searchSuggestions,
      user,
    }
  }

  it('should render component', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const backdrop = screen.getByTestId('backdrop')

    expect(input).toBeVisible()
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
    expect(backdrop).not.toBeVisible()
  })

  it('should display user-entered text in search bar when a user enters it', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')

    await user.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)
  })

  it('should display search suggestion with href attribute present when user enter the text on search bar', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await user.type(input, userEnteredText)

    const suggestionModal = await screen.findByRole('contentinfo')
    const suggestions = await screen.findByText('suggestions')
    const categories = await screen.findByText('categories')
    expect(suggestionModal).toBeVisible()
    expect(suggestions).toBeVisible()
    expect(categories).toBeVisible()

    const PagesSuggestionGroup =
      searchSuggestions.suggestionGroups?.filter((sg) => sg?.name === 'pages') || []
    PagesSuggestionGroup[0]?.suggestions?.map(async (s) => {
      expect(screen.getByText(s?.suggestion?.productName)).toBeVisible()
      const button = await screen.findByRole('button')
      expect(button).toHaveAttribute('href', `/product/${s?.suggestion.productCode}`)
    })

    const CategoriesSuggestionGroup =
      searchSuggestions.suggestionGroups?.filter((sg) => sg?.name === 'categories') || []
    CategoriesSuggestionGroup[0]?.suggestions?.map(async (s) => {
      expect(screen.getByText(s?.suggestion?.productName)).toBeVisible()

      const button = await screen.findByRole('button')
      expect(button).toHaveAttribute('href', `/category/${s?.suggestion.categoryCode}`)
    })
  })

  it('should display backdrop when search suggestion opens', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await user.type(input, userEnteredText)

    const suggestions = await screen.findByText('suggestions')
    expect(suggestions).toBeVisible()
    const backdrop = await screen.findByTestId('backdrop')
    expect(backdrop).toBeVisible()
  })

  it('should clear the search input and close the search suggestion when user clicks on cross button', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const clearButton = screen.getByRole('button', { name: 'clear-search' })
    await user.type(input, userEnteredText)

    expect(clearButton).toBeEnabled()
    await user.click(clearButton)

    expect(input).toHaveValue('')
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })

  it('should close search suggestion when user clears the search text', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await user.type(input, userEnteredText)

    const suggestionModal = await screen.findByRole('contentinfo')
    expect(suggestionModal).toBeVisible()

    await user.clear(input)
    expect(input).toHaveValue('')
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })

  it('should close search suggestion when user clicks on backdrop', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const backdrop = await screen.findByTestId('backdrop')
    await user.type(input, userEnteredText)

    await user.click(backdrop)
    await waitFor(() => expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument())
  })

  it('should not open Search suggestion when a user enters white/blank space', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await user.type(input, '  ')

    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })

  it('should close the Search suggestion when a user press enter', async () => {
    const { user } = setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await user.type(input, 'T')
    await user.type(input, '{enter}')

    expect(mockRouter).toMatchObject({
      asPath: '/search?search=T',
      pathname: '/search',
      query: { search: 'T' },
    })
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument()
  })
})
