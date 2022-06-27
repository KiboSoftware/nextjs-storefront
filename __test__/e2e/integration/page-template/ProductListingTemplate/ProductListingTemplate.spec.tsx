import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/page-templates/ProductListingTemplate/ProductListingTemplate.stories' // import all stories from the stories file
import { productGetters } from '@/lib/getters'

const { Category } = composeStories(stories)

describe('[component] - Category Integration', () => {
  const onSortingSelectionMock = jest.fn()
  const setup = () => {
    render(<Category onSortingSelection={onSortingSelectionMock} />)
    return { onSortingSelectionMock }
  }

  it('should call onSortingSelection function when user clicks on sorting', async () => {
    setup()

    const selectButton = screen.getByRole('button', { name: /best-match/i })

    fireEvent.mouseDown(selectButton)
    const listbox = within(screen.getByRole('listbox'))
    const sortingValues = Category?.args?.sortingValues || []

    userEvent.click(listbox.getByText(sortingValues[0].value))

    await waitFor(() => {
      expect(onSortingSelectionMock).toBeCalledWith('kibo-select', sortingValues[0].value)
    })
  })

  it('should display all the products when user clicks on Show more button', () => {
    setup()

    const productsBeforeClick =
      Category?.args?.products?.map((product) => productGetters.getName(product)) || []

    const productsRegexBeforeClick = new RegExp(productsBeforeClick.join('|'), 'i')
    const productsListBeforeClick = screen.getAllByText(productsRegexBeforeClick)

    expect(productsListBeforeClick).toHaveLength(Category.args?.initialProductsToShow || 0)

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    userEvent.click(showMoreButton)
    const productsAfterClick =
      Category?.args?.products?.map((product) => productGetters.getName(product)) || []

    const productsRegexAfterClick = new RegExp(productsAfterClick.join('|'), 'i')
    const productsListAfterClick = screen.getAllByText(productsRegexAfterClick)

    expect(productsListAfterClick).toHaveLength(Category.args?.products?.length || 0)
  })
})
