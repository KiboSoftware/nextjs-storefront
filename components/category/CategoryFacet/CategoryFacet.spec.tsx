import React from 'react'

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
        onCategoryChildrenSelection={onCategoryChildrenSelectionMock}
        onBackButtonClick={onBackButtonClickMock}
      />
    )
    return { onCategoryChildrenSelectionMock, onBackButtonClickMock }
  }

  it('should render component', () => {
    setup()
    const heading = screen.getByRole('heading')
    const backButton = screen.getByText(/back/, { selector: 'button' })
    const viewMoreButton = screen.getByText(/view-more/, { selector: 'button' })
    const childrenCategories = screen.getAllByTestId('count')

    expect(heading).toBeVisible()
    expect(backButton).toBeInTheDocument()
    expect(childrenCategories.length).toEqual(5)
    expect(viewMoreButton).toBeInTheDocument()
  })

  it('should call onCategoryChildSelection when user selects specific category', () => {
    const { onCategoryChildrenSelectionMock } = setup()

    const childrenCategories = screen.getAllByTestId('count')
    const category = childrenCategories[0]
    userEvent.click(category)

    expect(onCategoryChildrenSelectionMock).toHaveBeenCalled()
  })

  it('should call onBackButtonClick when user clicks on Back button', () => {
    const { onBackButtonClickMock } = setup()

    const backButton = screen.getByText(/back/, { selector: 'button' })
    userEvent.click(backButton)

    expect(onBackButtonClickMock).toHaveBeenCalled()
  })

  it('should display all the children when user clicks on View More button', () => {
    setup()
    const viewMoreButton = screen.getByText(/view-more/, { selector: 'button' })
    userEvent.click(viewMoreButton)

    const childrenCategoriesAfterClick = screen.getAllByTestId('count')

    expect(viewMoreButton).not.toBeInTheDocument()
    expect(childrenCategoriesAfterClick.length).toEqual(8)
  })
})
