import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductListingTemplate.stories' // import all stories from the stories file

const { Category } = composeStories(stories)

const KiboBreadcrumbsMock = () => <div data-testid="breadcrumb-component" />
const ProductCardMock = () => <div data-testid="product-card-component" />
const CategoryFacetMock = () => <div data-testid="category-facet-component" />
const CategoryFilterByMobileMock = () => <div data-testid="category-filterby-mobile-component" />

jest.mock('../../category/CategoryFacet/CategoryFacet', () => CategoryFacetMock)
jest.mock(
  '../../category/CategoryFilterByMobile/CategoryFilterByMobile',
  () => CategoryFilterByMobileMock
)
jest.mock('../../core/Breadcrumbs/Breadcrumbs', () => KiboBreadcrumbsMock)
jest.mock('../../product/ProductCard/ProductCard', () => ProductCardMock)

describe('[component] - Category', () => {
  const setup = () => {
    render(<Category />)
  }

  it('should render component', () => {
    setup()

    const breadCrumbComponent = screen.getByTestId('breadcrumb-component')
    const productCardComponent = screen.getAllByTestId('product-card-component')
    const categoryFacetComponent = screen.getByTestId('category-facet-component')
    const header = screen.getByRole('heading', { level: 1 })
    const showMoreButton = screen.getByRole('button', { name: /show-more/i })

    expect(breadCrumbComponent).toBeInTheDocument()
    expect(productCardComponent.length).toEqual(Category.args?.initialProductsToShow)
    expect(categoryFacetComponent).toBeInTheDocument()
    expect(header).toHaveTextContent(Category.args?.categoryFacet?.header || '')
    expect(showMoreButton).toBeVisible()
  })

  it('should show all the product after user click on show more button', () => {
    setup()

    const productCardComponentBeforeClick = screen.getAllByTestId('product-card-component')
    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    userEvent.click(showMoreButton)
    const productCardComponentAfterClick = screen.getAllByTestId('product-card-component')

    expect(productCardComponentBeforeClick.length).toEqual(Category.args?.initialProductsToShow)
    expect(productCardComponentAfterClick.length).toEqual(Category.args?.products?.length)
  })

  it('should hide filter by button after user click on filter By button', () => {
    setup()

    const filterByButton = screen.getByRole('button', { name: /filter-by/i })
    userEvent.click(filterByButton)

    expect(filterByButton).not.toBeVisible()
  })
})
