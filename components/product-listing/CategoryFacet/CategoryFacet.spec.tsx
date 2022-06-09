import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CategoryFacet.stories' // import all stories from the stories file

const { CategoryFacetDesktop } = composeStories(stories)

describe('[component] - CategoryFacet', () => {
  const setup = () => render(<CategoryFacetDesktop />)

  it('should render component', () => {
    setup()

    const heading = screen.getByRole('heading')
    const backButton = screen.getByRole('link', { name: /back/i })

    const childrenCategoriesLabels =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories?.map(
        (category) => category.label
      ) || []

    const childrenCategoriesLabelsRegex = new RegExp(childrenCategoriesLabels.join('|'), 'i')
    const childrenCategoriesLabelsList = screen.getAllByText(childrenCategoriesLabelsRegex)

    expect(childrenCategoriesLabelsList).toHaveLength(
      CategoryFacetDesktop.args?.initialItemsToShow || 0
    )
    expect(heading).toBeVisible()
    expect(backButton).toBeInTheDocument()
  })

  it('should display all the children when user clicks on View More button', () => {
    setup()

    const childrenCategoriesLabelsBeforeClick =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories?.map(
        (category) => category.label
      ) || []

    const childrenCategoriesLabelsRegexBeforeClick = new RegExp(
      childrenCategoriesLabelsBeforeClick.join('|'),
      'i'
    )
    const childrenCategoriesLabelsListBeforeClick = screen.getAllByText(
      childrenCategoriesLabelsRegexBeforeClick
    )

    expect(childrenCategoriesLabelsListBeforeClick).toHaveLength(
      CategoryFacetDesktop.args?.initialItemsToShow || 0
    )

    const viewMoreButton = screen.getByRole('button', { name: /view-more/i })
    userEvent.click(viewMoreButton)
    const childrenCategoriesLabelsAfterClick =
      CategoryFacetDesktop?.args?.categoryFacet?.childrenCategories?.map(
        (category) => category.label
      ) || []

    const childrenCategoriesLabelsRegexAfterClick = new RegExp(
      childrenCategoriesLabelsAfterClick.join('|'),
      'i'
    )
    const childrenCategoriesLabelsListAfterClick = screen.getAllByText(
      childrenCategoriesLabelsRegexAfterClick
    )

    expect(childrenCategoriesLabelsListAfterClick).toHaveLength(
      CategoryFacetDesktop.args?.categoryFacet?.childrenCategories?.length || 0
    )
  })
})
