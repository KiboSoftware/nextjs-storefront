import React, { useState } from 'react'

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchBar from './SearchBar'

describe('[components] - SearchBar', () => {
  const userEnteredText = 'T'

  const setup = (showClearButton = false) => {
    let handleSearch

    const WrapperComponent = () => {
      const [searchTerm, setSearchTerm] = useState('')
      handleSearch = jest.fn((v) => setSearchTerm(v))

      return (
        <SearchBar
          placeHolder="Search Brand"
          searchTerm={searchTerm}
          onSearch={handleSearch}
          showClearButton={showClearButton}
        />
      )
    }

    render(<WrapperComponent />)

    return {
      handleSearch,
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
    const { handleSearch } = setup()

    // act
    const input = screen.getByRole('textbox', { name: 'search-input' })
    expect(input).toHaveValue('')
    await userEvent.type(input, userEnteredText)

    // assert
    expect(handleSearch).toHaveBeenCalledWith(userEnteredText)
    expect(input).toHaveValue(userEnteredText)
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
      setup(true)

      // act
      const input = screen.getByRole('textbox', { name: 'search-input' })
      const clearButton = screen.getByRole('button', { name: 'clear-search' })
      expect(clearButton).toBeDisabled()
      await userEvent.type(input, userEnteredText)

      // assert
      expect(input).toHaveValue(userEnteredText)
      expect(clearButton).toBeEnabled()
    })

    it('should clear the search when user clicks on it', async () => {
      // arrange
      setup(true)

      // act
      const input = screen.getByRole('textbox', { name: 'search-input' })
      const clearButton = screen.getByRole('button', { name: 'clear-search' })

      await userEvent.type(input, userEnteredText)
      expect(input).toHaveValue(userEnteredText)
      expect(clearButton).toBeEnabled()
      await userEvent.click(clearButton)

      // assert
      expect(input).toHaveValue('')
    })
  })
})
