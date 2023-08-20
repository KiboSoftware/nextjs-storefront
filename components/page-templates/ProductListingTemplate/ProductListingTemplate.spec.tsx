import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { ProductListingTemplateProps } from './ProductListingTemplate'
import * as stories from './ProductListingTemplate.stories' // import all stories from the stories file
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

jest.mock('next/config', () => {
  return () => ({
    publicRuntimeConfig: {
      maxCookieAge: 0,
      productListing: {
        sortOptions: [
          { value: 'Best Match', id: '' },
          { value: 'Price: Low to High', id: 'price asc' },
          { value: 'Price: High to Low', id: 'price desc' },
          { value: 'Latest', id: 'createDate desc' },
          { value: 'Oldest', id: 'createDate asc' },
        ],
        pageSize: 16,
      },
      isMultiShipEnabled: true,
    },
    serverRuntimeConfig: {
      cacheKey: 'categoryTree',
      cacheTimeOut: 10000,
      isMultiShipEnabled: true,
    },
  })
})

describe('[component] - Product Listing Template', () => {
  const setup = (params?: ProductListingTemplateProps) => {
    const user = userEvent.setup()
    const props = params ? params : Category.args
    const onPaginationChangeMock = jest.fn()
    const onSortItemSelectionMock = jest.fn()
    const onInfiniteScrollMock = jest.fn()
    render(
      <Category
        {...props}
        onPaginationChange={onPaginationChangeMock}
        onSortItemSelection={onSortItemSelectionMock}
        onInfiniteScroll={onInfiniteScrollMock}
      />
    )
    return {
      user,
      onPaginationChangeMock,
      onSortItemSelectionMock,
      onInfiniteScrollMock,
    }
  }

  it('should render component', async () => {
    const { user } = setup()

    const breadCrumbComponent = screen.getByTestId('breadcrumb-component')
    const header = screen.getByRole('heading', { level: 1 })
    const viewText = screen.getAllByText(/view/i)
    const sortByText = screen.getByText(/sort-by/i)
    const categoryFacetComponent = screen.getAllByTestId('category-facet-component')
    const filtersFacetComponent = screen.getByTestId('filters-facet-component')
    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    const sortingValues = Category?.args?.sortingValues?.options?.map((sort) => sort.value) || []

    const sortingValuesRegex = new RegExp(sortingValues?.join('|'), 'i')
    const selectButton = screen.getByRole('button', { name: 'sort-plp' })

    user.click(selectButton)

    await waitFor(() => {
      const listbox = within(screen.getByRole('listbox'))
      const listValues = listbox.getAllByText(sortingValuesRegex)
      expect(listValues.map((list) => list.textContent)).toEqual(sortingValues)
    })

    const totalResults = screen.getByText(/results/i)
    expect(totalResults).toBeInTheDocument()

    const itemsCount = screen.getByText(/products-to-show/i)
    expect(itemsCount).toBeInTheDocument()

    expect(breadCrumbComponent).toBeInTheDocument()
    expect(header).toHaveTextContent(Category.args?.productListingHeader || '')
    expect(viewText[0]).toBeVisible()
    expect(sortByText).toBeVisible()
    expect(categoryFacetComponent[0]).toBeInTheDocument()
    expect(filtersFacetComponent).toBeInTheDocument()
    expect(showMoreButton).toBeVisible()
  })

  it('should call onInfiniteScrollMock when user clicks on show more button', async () => {
    const { user, onInfiniteScrollMock } = setup()

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    user.click(showMoreButton)

    await waitFor(() => {
      expect(onInfiniteScrollMock).toHaveBeenCalled()
    })
  })

  it('should hide filter by button when user clicks on filter By button', async () => {
    const { user } = setup()

    const filterByButton = screen.getByRole('button', { name: /filter-by/i })
    user.click(filterByButton)

    await waitFor(() => {
      expect(filterByButton).not.toBeVisible()
    })
  })

  it('should call onSortItemSelection function when user clicks on sorting', async () => {
    const { user, onSortItemSelectionMock } = setup()

    const selectButton = screen.getByRole('button', { name: 'sort-plp' })

    user.click(selectButton)

    await waitFor(() => {
      const listbox = within(screen.getByRole('listbox'))
      const sortingValues = Category?.args?.sortingValues?.options || []

      user.click(listbox.getByText(sortingValues[1].value))
      expect(selectButton).toHaveTextContent(sortingValues[0].value)
    })

    await waitFor(() => {
      expect(onSortItemSelectionMock).toHaveBeenCalled()
    })
  })

  it('should show show more button when pageSize is greater than total results', () => {
    setup()

    const showMoreButton = screen.getByRole('button', { name: /show-more/i })
    expect(showMoreButton).toBeVisible()
  })

  it('should hide the show more button when pageSize is greater than or equal to totalResults', () => {
    // const params = {
    //   breadCrumbsList: [
    //     {
    //       text: 'Home',
    //       link: '/',
    //     },
    //     {
    //       text: 'Mens',
    //       link: '/mens',
    //     },
    //     {
    //       text: 'Pants',
    //       link: '/mens/pants',
    //     },
    //   ],
    //   productListingHeader: 'Apparel',
    //   categoryFacet: categoryFacetDataMock,
    //   totalResults: 30,
    //   appliedFilters: [],
    //   pageSize: 30,
    //   onSortItemSelection: (value: string) => ({ value }),
    //   onPaginationChange: (value: string) => ({ value }),
    // }
    //TODO: write separate test for pagination
    // setup(params)

    const showMoreButton = screen.queryByRole('button', { name: /show-more/i })

    expect(showMoreButton).not.toBeInTheDocument()
  })
})
