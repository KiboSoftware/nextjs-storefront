import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

import * as stories from './CreateList.stories'
import { B2BProductSearchProps } from '@/components/b2b/B2BProductSearch/B2BProductSearch'

import { Product } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const nonConfigurableProductMock: Product = {
  productCode: 'pdt1',
  options: [
    {
      isRequired: false,
    },
  ],
  createDate: undefined,
  personalizationScore: 0,
  score: 0,
  updateDate: undefined,
}

const createMatchMedia = (width: number) => (query: string) => ({
  matches: mediaQuery.match(query, { width }),
  addListener: () => jest.fn(),
  removeListener: () => jest.fn(),
  media: query,
  onchange: null,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
})

jest.mock('@/components/b2b/B2BProductSearch/B2BProductSearch', () => ({
  __esModule: true,
  default: ({ onAddProduct }: B2BProductSearchProps) => {
    return (
      <div data-testid="product-search">
        <input data-testid="search-input" />
        <button
          data-testid="add-non-configurable-product-button"
          onClick={() => onAddProduct(nonConfigurableProductMock)}
        >
          Add Configurable Product
        </button>
      </div>
    )
  },
}))

jest.mock('@/components/my-account/Lists/ListItem/ListItem', () => ({
  __esModule: true,
  default: ({ item, onChangeQuantity, onDeleteItem }: any) => {
    return (
      <div data-testid="list-item">
        <div data-testid="item-code">{item?.product?.productCode}</div>
        <div data-testid="item-name">{item?.product?.productName}</div>
        <div data-testid="item-quantity">{item?.quantity}</div>
        <input onChange={onChangeQuantity} data-testid="quantity-input" />
        <button
          onClick={() => {
            onDeleteItem(item.product.productCode)
          }}
        >
          Delete
        </button>
      </div>
    )
  },
}))

const onCreateFormToggleMock = jest.fn()

function setup() {
  const user = userEvent.setup()
  render(<Common {...Common.args} onCreateFormToggle={onCreateFormToggleMock} />)
  return { user }
}

describe('[componenet] - Create List', () => {
  it('should render the component', () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    expect(screen.getByText(/create-new-list/i)).toBeVisible()
    expect(screen.getByText(/save-and-close/i)).toBeVisible()
    expect(screen.getByText(/my-account/i)).toBeVisible()
    expect(screen.getByPlaceholderText(/name-this-list/i)).toBeVisible()
    const productSearch = screen.getByTestId('product-search')
    expect(productSearch).toBeVisible()
    expect(within(productSearch).getByTestId('search-input')).toBeVisible()
  })

  it('should change list name input', async () => {
    const { user } = setup()
    const newListName = 'New List'
    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)
    user.type(listNameInput, newListName)
    await waitFor(() => {
      expect(listNameInput).toHaveValue(newListName)
    })
  })

  it('should redirect to /my-account page in mobile view', async () => {
    window.matchMedia = createMatchMedia(500)
    const { user } = setup()
    const myAccountBtn = screen.getByTestId('my-account-button')
    expect(myAccountBtn).toBeVisible()
    user.click(myAccountBtn)
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
      })
    })
  })

  it('should redirect to /my-account page', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const myAccountBtn = screen.getByTestId('my-account-button')
    expect(myAccountBtn).toBeVisible()
    user.click(myAccountBtn)
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
      })
    })
  })

  it('should cancel create form', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const cancelBtn = screen.getByText(/cancel/i)
    expect(cancelBtn).toBeVisible()

    user.click(cancelBtn)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalled()
    })
  })

  it('should save and close create form', async () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const saveAndCloseBtn = screen.getByText(/save-and-close/i)
    expect(saveAndCloseBtn).toBeVisible()
    expect(saveAndCloseBtn).toBeDisabled()

    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)

    fireEvent.change(listNameInput, { target: { value: 'New List' } })

    expect(listNameInput).toHaveValue('New List')
    expect(saveAndCloseBtn).toBeEnabled()

    fireEvent.click(saveAndCloseBtn)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalled()
    })
  })

  it('should add product to new list', async () => {
    setup()
    const productSearch = screen.getByTestId('product-search')
    const searchInput = within(productSearch).getByTestId('search-input')

    fireEvent.change(searchInput, { target: { value: nonConfigurableProductMock.productCode } })

    expect(searchInput).toHaveValue(nonConfigurableProductMock.productCode)
    const productSuggestion = within(productSearch).getByTestId(
      'add-non-configurable-product-button'
    )

    fireEvent.click(productSuggestion)

    await waitFor(() => {
      expect(screen.getByText(/pdt1/i)).toBeVisible()
    })
  })

  it('should remove added product from list', async () => {
    setup()
    const productSearch = screen.getByTestId('product-search')
    const searchInput = within(productSearch).getByTestId('search-input')

    fireEvent.change(searchInput, { target: { value: nonConfigurableProductMock.productCode } })

    expect(searchInput).toHaveValue(nonConfigurableProductMock.productCode)
    const productSuggestion = within(productSearch).getByTestId(
      'add-non-configurable-product-button'
    )

    fireEvent.click(productSuggestion)

    await waitFor(() => {
      expect(screen.getByText(/pdt1/i)).toBeVisible()
    })

    const listItem = screen.getAllByTestId('list-item')
    const deleteBtn = within(listItem[0]).getByText(/delete/i)

    fireEvent.click(deleteBtn)

    expect(screen.queryByTestId('list-item')).not.toBeInTheDocument()
  })
})
