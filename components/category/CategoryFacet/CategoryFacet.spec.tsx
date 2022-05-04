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

    const childrenCategoriesLabels =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories.map(
        (category) => category.label
      ) || []

    const childrenCategoriesLabelsRegex = new RegExp(childrenCategoriesLabels.join('|'), 'gi')
    const childrenCategoriesLabelsList = screen.getAllByText(childrenCategoriesLabelsRegex)

    expect(childrenCategoriesLabelsList).toHaveLength(
      CategoryFacetDesktop.args?.initialItemsToShow || 0
    )
    expect(heading).toBeVisible()
    expect(backButton).toBeInTheDocument()
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
