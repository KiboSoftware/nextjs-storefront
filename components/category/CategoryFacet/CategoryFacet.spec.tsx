import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CategoryFacet.stories' // import all stories from the stories file

const { CategoryFacetDesktop } = composeStories(stories)

describe('[component] - CategoryFacet', () => {
  const setup = (categoryFacetMock = CategoryFacetDesktop.args?.categoryFacet) => {
    const onCategoryChildrenSelectionMock = jest.fn()
    const onBackButtonClickMock = jest.fn()
    render(
      <CategoryFacetDesktop
        categoryFacet={categoryFacetMock}
        onCategoryChildrenSelection={onCategoryChildrenSelectionMock}
        onBackButtonClick={onBackButtonClickMock}
      />
    )
    return { onCategoryChildrenSelectionMock, onBackButtonClickMock, categoryFacetMock }
  }

  it('should render component', () => {
    const { categoryFacetMock } = setup({
      header: CategoryFacetDesktop.args?.categoryFacet?.header || '',
      childrenCategories:
        CategoryFacetDesktop.args?.categoryFacet?.childrenCategories?.slice(0, 2) || [],
    })

    const firstChildrenCategoryFromMock =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories[0]?.label || ''
    const secondChildrenCategoryFromMock =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories[1]?.label || ''

    const heading = screen.getByRole('heading')
    const backButton = screen.getByRole('button', { name: /back/ })
    const firstChildrenCategory = screen.getByText(firstChildrenCategoryFromMock)
    const secondChildrenCategory = screen.getByText(secondChildrenCategoryFromMock)
    const childrenCategories = screen.getAllByTestId('count')

    expect(heading).toBeVisible()
    expect(backButton).toBeInTheDocument()
    expect(firstChildrenCategory).toBeInTheDocument()
    expect(secondChildrenCategory).toBeInTheDocument()
    expect(childrenCategories.length).toEqual(categoryFacetMock?.childrenCategories.length)
  })

  it('should call onCategoryChildSelection when user selects specific category', () => {
    const { onCategoryChildrenSelectionMock } = setup()

    const childrenCategorylabel =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories[0]?.label || ''
    const childrenCategoryCode =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories[0]?.value || ''
    const category = screen.getByText(childrenCategorylabel)
    userEvent.click(category)

    expect(onCategoryChildrenSelectionMock).toHaveBeenCalledWith(childrenCategoryCode)
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
      CategoryFacetDesktop.args?.categoryFacet?.childrenCategories?.length
    )
  })
})
