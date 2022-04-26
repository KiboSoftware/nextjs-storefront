import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CategoryFacet.stories' // import all stories from the stories file

const { CategoryFacetDesktop } = composeStories(stories)

describe('[component] - CategoryFacet', () => {
  const setup = () => {
    const onCategoryChildrenSelectionMock = jest.fn()
    const goBackToPreviousRouteMock = jest.fn()
    const handleViewMoreMock = jest.fn()
    render(
      <CategoryFacetDesktop
        onCategoryChildrenSelection={onCategoryChildrenSelectionMock}
        goBackToPreviousRoute={goBackToPreviousRouteMock}
        handleViewMoreClick={handleViewMoreMock}
      />
    )
    return { onCategoryChildrenSelectionMock, goBackToPreviousRouteMock, handleViewMoreMock }
  }

  it('should render component', () => {
    setup()
    const heading = screen.getByRole('heading')

    expect(heading).toBeVisible()
  })

  it('should call children categories', () => {
    const { onCategoryChildrenSelectionMock } = setup()

    const childrenCategories = screen.getAllByTestId('count')
    const category = childrenCategories[0]
    userEvent.click(category)

    expect(onCategoryChildrenSelectionMock).toHaveBeenCalled()
  })

  it('should call back button', () => {
    const { goBackToPreviousRouteMock } = setup()

    const backButton = screen.getByText(/back/, { selector: 'button' })
    userEvent.click(backButton)

    expect(goBackToPreviousRouteMock).toHaveBeenCalled()
  })

  it('should call view more button', () => {
    const { handleViewMoreMock } = setup()

    const backButton = screen.getByText(/view-more/, { selector: 'button' })
    userEvent.click(backButton)

    expect(handleViewMoreMock).toHaveBeenCalled()
    expect(backButton).not.toBeInTheDocument()
  })
})
