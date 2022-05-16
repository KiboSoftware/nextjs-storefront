import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.stories' // import all stories from the stories file

const { Category } = composeStories(stories)

describe('[component] - Category', () => {
  const onSortingSelection = jest.fn()
  const onBackButtonClickMock = jest.fn()
  const setup = () => {
    render(
      <Category
        handleSortingSelection={onSortingSelection}
        handleBackButtonClick={onBackButtonClickMock}
      />
    )
    return { onSortingSelection, onBackButtonClickMock }
  }

  it('should call handleSortingSelection function after user click on sorting', () => {
    setup()

    const selectButton = screen.getByRole('button', { name: /best-match/i })

    fireEvent.mouseDown(selectButton)

    const listbox = within(screen.getByRole('listbox'))
    const sortingValues = Category?.args?.sortingValues || []

    fireEvent.click(listbox.getByText(sortingValues[0].value))

    expect(selectButton).toHaveTextContent(sortingValues[0].value)
    expect(onSortingSelection).toBeCalledWith('kibo-select', sortingValues[0].value)
  })

  it('should call back button after user click on back button', () => {
    setup()
    const backButton = screen.getByRole('button', { name: /back/i })

    userEvent.click(backButton)

    expect(onBackButtonClickMock).toHaveBeenCalled()
  })
})
