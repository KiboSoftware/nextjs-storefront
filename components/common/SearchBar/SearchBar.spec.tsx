import React, { useState } from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SearchBar.stories'

const { Common } = composeStories(stories)

describe('[components] - SearchBar', () => {
  const userEnteredText = 'T'

  const setup = (showClearButton = false) => {
    let handleSearch
    let handleEnterSearch

    const WrapperComponent = () => {
      const [searchTerm, setSearchTerm] = useState('')
      handleSearch = jest.fn((v) => setSearchTerm(v))
      handleEnterSearch = jest.fn()
      return (
        <Common
          placeHolder="Search Brand"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          showClearButton={showClearButton}
          onKeyEnter={handleEnterSearch}
        />
      )
    }

    const user = userEvent.setup()
    render(<WrapperComponent />)

    return {
      handleSearch,
      user,
    }
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const input = screen.getByRole('textbox', { name: 'search-input' })
    const clearButton = screen.queryByRole('button', { name: 'clear-search' })

    // assert
    expect(input).toBeVisible()
    expect(clearButton).not.toBeInTheDocument()
    expect(input).toHaveAttribute('placeHolder', 'Search Brand')
  })

  it('should call onSeach handler and show user entered text on every caracter input', async () => {
    // arrange
    const { handleSearch, user } = setup()

    // act
    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')
    user.type(input, userEnteredText)

    // assert
    await waitFor(() => {
      expect(handleSearch).toHaveBeenCalledWith(userEnteredText)
    })

    await waitFor(() => {
      expect(input).toHaveValue(userEnteredText)
    })
  })

  describe('[components] - clear button', () => {
    it('should not be visible by default', () => {
      // arrange
      setup()

      // act
      const clearButton = screen.queryByRole('button', { name: 'clear-search' })

      // assert
      expect(clearButton).not.toBeInTheDocument()
    })

    it('should be visible when showClearButton = true', () => {
      // arrange
      setup(true)

      // act
      const clearButton = screen.getByRole('button', { name: 'clear-search' })

      // assert
      expect(clearButton).toBeVisible()
    })

    it('should be only enable when there is text to clear', async () => {
      // arrange
      const { user } = setup(true)

      // act
      const input = screen.getByRole('textbox', { name: 'search-input' })
      const clearButton = screen.getByRole('button', { name: 'clear-search' })
      expect(clearButton).toBeDisabled()
      user.type(input, userEnteredText)

      // assert
      await waitFor(() => {
        expect(input).toHaveValue(userEnteredText)
      })

      await waitFor(() => {
        expect(clearButton).toBeEnabled()
      })
    })

    it('should clear the search when user clicks on it', async () => {
      // arrange
      const { user } = setup(true)

      // act
      const input = screen.getByRole('textbox', { name: 'search-input' })
      const clearButton = screen.getByRole('button', { name: 'clear-search' })

      user.type(input, userEnteredText)
      await waitFor(() => {
        expect(input).toHaveValue(userEnteredText)
      })
      await waitFor(() => {
        expect(clearButton).toBeEnabled()
      })

      user.click(clearButton)

      // assert
      await waitFor(() => {
        expect(input).toHaveValue('')
      })
    })
  })
})
