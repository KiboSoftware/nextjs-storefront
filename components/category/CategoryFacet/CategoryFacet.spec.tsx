import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CategoryFacet.stories' // import all stories from the stories file

const { CategoryFacetDesktop } = composeStories(stories)

describe('[component] - CategoryFacet', () => {
  const setup = () => {
    const onCategoryChildrenSelectionMock = jest.fn()
    const onBackButtonClickMock = jest.fn()
    render(
      <CategoryFacetDesktop
        {...CategoryFacetDesktop.args}
        onCategoryChildrenSelection={onCategoryChildrenSelectionMock}
        onBackButtonClick={onBackButtonClickMock}
      />
    )
    return { onCategoryChildrenSelectionMock, onBackButtonClickMock }
  }

  it('should render component', () => {
    setup()
    const heading = screen.getByRole('heading')
    const backButton = screen.getByRole('button', { name: /back/ })
    const viewMoreButton = screen.getByRole('button', { name: /view-more/ })
    const childrenCategory = screen.getByText(/jackets/i)
    const childrenCategories = screen.getAllByTestId('count')

    expect(heading).toBeVisible()
    expect(backButton).toBeInTheDocument()
    expect(childrenCategory).toBeInTheDocument()
    expect(childrenCategories.length).toEqual(CategoryFacetDesktop.args?.initialItemsToShow)
    expect(viewMoreButton).toBeInTheDocument()
  })

  it('should call onCategoryChildSelection when user selects specific category', () => {
    const { onCategoryChildrenSelectionMock } = setup()

    const category = screen.getByText(/jackets/i)
    userEvent.click(category)

    expect(onCategoryChildrenSelectionMock).toHaveBeenCalledWith('53')
  })

  it('should call onBackButtonClick when user clicks on Back button', () => {
    const { onBackButtonClickMock } = setup()

    const backButton = screen.getByRole('button', { name: /back/ })
    userEvent.click(backButton)

    expect(onBackButtonClickMock).toHaveBeenCalled()
  })

  it('should display all the children when user clicks on View More button', () => {
    setup()

    const childrenCategoriesBeforeClick = screen.getAllByTestId('count')
    const viewMoreButton = screen.getByRole('button', { name: /view-more/ })
    userEvent.click(viewMoreButton)

    const childrenCategoriesAfterClick = screen.getAllByTestId('count')

    expect(viewMoreButton).not.toBeInTheDocument()
    expect(childrenCategoriesBeforeClick.length).toEqual(
      CategoryFacetDesktop.args?.initialItemsToShow
    )
    expect(childrenCategoriesAfterClick.length).toEqual(
      CategoryFacetDesktop.args?.categoryFacet?.childrenCategories.length
    )
  })
})
