import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.stories' // import all stories from the stories file

const { Category } = composeStories(stories)

describe('[component] - Category', () => {
  const onSortingSelectionMock = jest.fn()
  const onBackButtonClickMock = jest.fn()
  const setup = () => {
    render(
      <Category
        onSortingSelection={onSortingSelectionMock}
        onBackButtonClick={onBackButtonClickMock}
      />
    )
    return { onSortingSelectionMock, onBackButtonClickMock }
  }

  it('should call onSortingSelection function when user clicks on sorting', () => {
    setup()

    const selectButton = screen.getByRole('button', { name: /best-match/i })

    fireEvent.mouseDown(selectButton)
    const listbox = within(screen.getByRole('listbox'))
    const sortingValues = Category?.args?.sortingValues || []

    userEvent.click(listbox.getByText(sortingValues[0].value))

    expect(selectButton).toHaveTextContent(sortingValues[0].value)
    expect(onSortingSelectionMock).toBeCalledWith('kibo-select', sortingValues[0].value)
  })

  it('should call to previous route when user clicks on back button', () => {
    setup()
    const backButton = screen.getByRole('button', { name: /back/i })

    userEvent.click(backButton)

    expect(onBackButtonClickMock).toHaveBeenCalled()
  })

  it('should display all the products when user clicks on Show more button', () => {
    setup()

    const productsBeforeClick = Category?.args?.products?.map((product) => product.title) || []

    const productsRegexBeforeClick = new RegExp(productsBeforeClick.join('|'), 'i')
    const productsListBeforeClick = screen.getAllByText(productsRegexBeforeClick)

    expect(productsListBeforeClick).toHaveLength(Category.args?.initialProductsToShow || 0)

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    userEvent.click(showMoreButton)
    const productsAfterClick = Category?.args?.products?.map((product) => product.title) || []

    const productsRegexAfterClick = new RegExp(productsAfterClick.join('|'), 'i')
    const productsListAfterClick = screen.getAllByText(productsRegexAfterClick)

    expect(productsListAfterClick).toHaveLength(Category.args?.products?.length || 0)
  })
})
