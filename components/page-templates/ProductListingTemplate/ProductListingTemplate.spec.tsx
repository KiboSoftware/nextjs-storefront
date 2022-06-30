import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductListingTemplate.stories' // import all stories from the stories file
const { Category } = composeStories(stories)

const KiboBreadcrumbsMock = () => <div data-testid="breadcrumb-component" />
const ProductCardMock = () => <div data-testid="product-card-component" />
const CategoryFacetMock = () => <div data-testid="category-facet-component" />
const CategoryFilterByMobileMock = () => <div data-testid="category-filterby-mobile-component" />

jest.mock('../../product-listing/CategoryFacet/CategoryFacet', () => CategoryFacetMock)
jest.mock(
  '../../product-listing/CategoryFilterByMobile/CategoryFilterByMobile',
  () => CategoryFilterByMobileMock
)
jest.mock('../../core/Breadcrumbs/KiboBreadcrumbs', () => KiboBreadcrumbsMock)
jest.mock('../../product/ProductCard/ProductCard', () => ProductCardMock)

describe('[component] - Category', () => {
  const setup = () => {
    render(<Category />)
  }

  it('should render component', () => {
    setup()

    const breadCrumbComponent = screen.getByTestId('breadcrumb-component')
    const header = screen.getByRole('heading', { level: 1 })
    const viewText = screen.getAllByText(/view/i)
    const sortByText = screen.getByText(/sort-by/i)
    const categoryFacetComponent = screen.getByTestId('category-facet-component')
    const productCardComponent = screen.getAllByTestId('product-card-component')
    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    const sortingValues = Category?.args?.sortingValues?.map((sort) => sort.value) || []

    const sortingValuesRegex = new RegExp(sortingValues.join('|'), 'i')
    const selectButton = screen.getByRole('button', { name: /best-match/i })

    fireEvent.mouseDown(selectButton)
    const listbox = within(screen.getByRole('listbox'))
    const listValues = listbox.getAllByText(sortingValuesRegex)
    const totalResults = screen.getByText(/results/i)

    expect(breadCrumbComponent).toBeInTheDocument()
    expect(header).toHaveTextContent(Category.args?.categoryFacet?.header || '')
    expect(viewText[0]).toBeVisible()
    expect(sortByText).toBeVisible()
    expect(categoryFacetComponent).toBeInTheDocument()
    expect(productCardComponent.length).toEqual(Category.args?.initialProductsToShow)
    expect(showMoreButton).toBeVisible()
    expect(listValues.map((list) => list.textContent)).toEqual(sortingValues)
    expect(totalResults).toBeInTheDocument()
  })

  it('should show all the product when user clicks on show more button', () => {
    setup()

    const productCardComponentBeforeClick = screen.getAllByTestId('product-card-component')

    expect(productCardComponentBeforeClick.length).toEqual(Category.args?.initialProductsToShow)

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    userEvent.click(showMoreButton)
    const productCardComponentAfterClick = screen.getAllByTestId('product-card-component')

    expect(productCardComponentAfterClick.length).toEqual(Category.args?.products?.length)
  })

  it('should hide filter by button when user clicks on filter By button', () => {
    setup()

    const filterByButton = screen.getByRole('button', { name: /filter-by/i })
    userEvent.click(filterByButton)

    expect(filterByButton).not.toBeVisible()
  })
})
