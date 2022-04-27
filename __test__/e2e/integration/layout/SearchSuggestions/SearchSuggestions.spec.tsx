import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/layout/SearchSuggestions/SearchSuggestions.stories'

const { Common } = composeStories(stories)

describe('[components] - SearchSuggestions Integration', () => {
  const userEnteredText = 'T'

  const setup = () => {
    render(<Common {...Common.args} />)
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
    await userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)
  })

  it('should display search suggestion when user entered the text on search bar', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)

    expect(screen.getByText('suggestions')).toBeVisible()
    expect(screen.getByText('categories')).toBeVisible()
    expect(screen.getByRole('separator')).toBeInTheDocument()

    const count = Common.args?.searchSuggestionResult?.suggestionGroups?.length || 0
    expect(screen.getAllByRole('group')).toHaveLength(count)
  })

  it('should display backdrop when search suggustion opens', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    await userEvent.type(input, userEnteredText)
    const backdrop = screen.getByTestId('backdrop')
    expect(backdrop).toBeVisible()
  })

  it('should clear the search input when user clicks on cross button', async () => {
    setup()

    const input = screen.getByRole('textbox', { name: 'search-input' })
    const clearButton = screen.getByRole('button', { name: 'clear-search' })

    await userEvent.type(input, userEnteredText)
    expect(input).toHaveValue(userEnteredText)
    expect(clearButton).toBeEnabled()
    await userEvent.click(clearButton)

    expect(input).toHaveValue('')
  })
})
