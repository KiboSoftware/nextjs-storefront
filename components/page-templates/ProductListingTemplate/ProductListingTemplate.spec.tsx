import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ProductListingTemplateProps } from './ProductListingTemplate'
import * as stories from './ProductListingTemplate.stories' // import all stories from the stories file
import { categoryFacetDataMock } from '@/__mocks__/stories/categoryFacetDataMock'
const { Category } = composeStories(stories)

const KiboBreadcrumbsMock = () => <div data-testid="breadcrumb-component" />
const CategoryFacetMock = () => <div data-testid="category-facet-component" />
const FiltersFacetMock = () => <div data-testid="filters-facet-component" />
const CategoryFilterByMobileMock = () => <div data-testid="category-filterby-mobile-component" />
const ProductCardMock = () => <div data-testid="product-card-component" />

jest.mock('../../product-listing/CategoryFacet/CategoryFacet', () => () => CategoryFacetMock())
jest.mock(
  '../../product-listing/CategoryFilterByMobile/CategoryFilterByMobile',
  () => () => CategoryFilterByMobileMock()
)
jest.mock('../../product-listing/FacetList/FacetList', () => () => FiltersFacetMock())
jest.mock('../../core/Breadcrumbs/KiboBreadcrumbs', () => () => KiboBreadcrumbsMock())
jest.mock('../../product/ProductCard/ProductCard', () => () => ProductCardMock())

describe('[component] - Category', () => {
  const setup = (params?: ProductListingTemplateProps) => {
    const user = userEvent.setup()
    const props = params ? params : Category.args
    const onPaginationChangeMock = jest.fn()
    const onSortItemSelectionMock = jest.fn()
    render(
      <Category
        {...props}
        onPaginationChange={onPaginationChangeMock}
        onSortItemSelection={onSortItemSelectionMock}
      />
    )
    return {
      user,
      onPaginationChangeMock,
      onSortItemSelectionMock,
    }
  }

  it('should render component', async () => {
    const { user } = setup()

    const breadCrumbComponent = screen.getByTestId('breadcrumb-component')
    const header = screen.getByRole('heading', { level: 1 })
    const viewText = screen.getAllByText(/view/i)
    const sortByText = screen.getByText(/sort-by/i)
    const categoryFacetComponent = screen.getByTestId('category-facet-component')
    const filtersFacetComponent = screen.getByTestId('filters-facet-component')
    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    const sortingValues = Category?.args?.sortingValues?.options?.map((sort) => sort.value) || []

    const sortingValuesRegex = new RegExp(sortingValues?.join('|'), 'i')
    const selectButton = screen.getByRole('button', { name: sortingValues[0] })

    await user.click(selectButton)
    const listbox = within(screen.getByRole('listbox'))
    const listValues = listbox.getAllByText(sortingValuesRegex)
    const totalResults = screen.getByText(/results/i)
    const itemsCount = screen.getByText(/products-to-show/i)

    expect(breadCrumbComponent).toBeInTheDocument()
    expect(header).toHaveTextContent(Category.args?.productListingHeader || '')
    expect(viewText[0]).toBeVisible()
    expect(sortByText).toBeVisible()
    expect(categoryFacetComponent).toBeInTheDocument()
    expect(filtersFacetComponent).toBeInTheDocument()
    expect(showMoreButton).toBeVisible()
    expect(listValues.map((list) => list.textContent)).toEqual(sortingValues)
    expect(totalResults).toBeInTheDocument()
    expect(itemsCount).toBeInTheDocument()
  })

  it('should call onPaginationChange when user clicks on show more button', async () => {
    const { user, onPaginationChangeMock } = setup()

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    await user.click(showMoreButton)
    expect(onPaginationChangeMock).toHaveBeenCalled()
  })

  it('should hide filter by button when user clicks on filter By button', async () => {
    const { user } = setup()

    const filterByButton = screen.getByRole('button', { name: /filter-by/i })
    await user.click(filterByButton)

    expect(filterByButton).not.toBeVisible()
  })

  it('should call onSortItemSelection function when user clicks on sorting', async () => {
    const { user, onSortItemSelectionMock } = setup()

    const sortingValuesOptions =
      Category?.args?.sortingValues?.options?.map((sort) => sort.value) || []
    const selectButton = screen.getByRole('button', { name: sortingValuesOptions[0] })

    await user.click(selectButton)
    const listbox = within(screen.getByRole('listbox'))
    const sortingValues = Category?.args?.sortingValues?.options || []
    await user.click(listbox.getByText(sortingValues[1].value))

    expect(selectButton).toHaveTextContent(sortingValues[0].value)
    await waitFor(() => {
      expect(onSortItemSelectionMock).toHaveBeenCalled()
    })
  })

  it('should show show more button when pageSize is greater than total results', () => {
    setup()

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    expect(showMoreButton).toBeVisible()
  })

  it('shoutd hide the show more button when pageSize is greater than or equal to totalResults', () => {
    const params = {
      breadCrumbsList: [
        {
          text: 'Home',
          link: '/',
        },
        {
          text: 'Mens',
          link: '/mens',
        },
        {
          text: 'Pants',
          link: '/mens/pants',
        },
      ],
      productListingHeader: 'Apparel',
      categoryFacet: categoryFacetDataMock,
      totalResults: 30,
      appliedFilters: [],
      pageSize: 30,
      onSortItemSelection: (value: string) => ({ value }),
      onPaginationChange: () => ({}),
    }
    setup(params)

    const showMoreButton = screen.queryByRole('button', { name: /show-more/i })

    expect(showMoreButton).not.toBeInTheDocument()
  })
})
