import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './EditList.stories'
import { B2BProductSearchProps } from '@/components/b2b/B2BProductSearch/B2BProductSearch'

import { Product } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const { listData } = stories

const onEditFormToggleMock = jest.fn()
const onUpdateListDataMock = jest.fn()
const onHandleAddListToCartMock = jest.fn()

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

const configurableProductMock: Product = {
  ...nonConfigurableProductMock,
  productCode: 'pdt2',
  options: [
    {
      isRequired: true,
    },
  ],
}

jest.mock('@/components/b2b/Lists/ListItem/ListItem', () => ({
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
            onDeleteItem(item.id || item.product.productCode)
          }}
        >
          Delete
        </button>
      </div>
    )
  },
}))

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
          Add Non Configurable Product
        </button>

        <button
          data-testid="add-configurable-product-button"
          onClick={() => onAddProduct(configurableProductMock)}
        >
          Add Configurable Product
        </button>
      </div>
    )
  },
}))

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

function setup() {
  const user = userEvent.setup()
  render(
    <Common
      {...Common.args}
      onEditFormToggle={onEditFormToggleMock}
      onUpdateListData={onUpdateListDataMock}
      onHandleAddListToCart={onHandleAddListToCartMock}
    />
  )
  return { user }
}

describe('[component] - Edit list', () => {
  it('should render the component', () => {
    setup()
    expect(screen.getByText(listData.name)).toBeVisible()
    const listItems = screen.getAllByTestId('list-item')
    listItems.forEach((item) => expect(item).toBeVisible())
    const productSearch = screen.getByTestId('product-search')
    expect(productSearch).toBeVisible()
    expect(within(productSearch).getByTestId('search-input')).toBeVisible()
  })

  it('should change list name', async () => {
    setup()
    const newListName = 'New List Name'
    const editBtn = screen.getByTestId('editNameBtn')

    fireEvent.click(editBtn)

    expect(editBtn).not.toBeVisible()

    const editNameInput = screen.getAllByRole('textbox')[0]
    expect(editNameInput).toBeVisible()

    fireEvent.input(editNameInput, { target: { value: '' } })

    expect(editNameInput).toHaveValue('')

    fireEvent.input(editNameInput, { target: { value: newListName } })

    expect(editNameInput).toHaveValue(newListName)
    const saveBtn = screen.getByTestId('saveNameBtn')

    fireEvent.click(saveBtn)

    expect(editNameInput).not.toBeVisible()
    expect(screen.getByText(newListName)).toBeVisible()
  })

  it('should close edit list', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const cancelBtn = screen.getByText(/cancel/i)

    user.click(cancelBtn)

    await waitFor(() => {
      expect(onEditFormToggleMock).toBeCalled()
    })
  })

  it('should close edit list mobile view', async () => {
    window.matchMedia = createMatchMedia(500)
    const { user } = setup()
    const cancelBtn = screen.getByText(/cancel/i)

    user.click(cancelBtn)

    await waitFor(() => {
      expect(onEditFormToggleMock).toBeCalled()
    })
  })

  it('should save and close edit list', async () => {
    const { user } = setup()
    const saveAndCloseBtn = screen.getByText(/save-and-close/i)
    user.click(saveAndCloseBtn)
    await waitFor(() => {
      expect(onUpdateListDataMock).toBeCalled()
    })
    await waitFor(() => {
      expect(onEditFormToggleMock).toBeCalled()
    })
  })

  it('should add product on click of product suggestion', async () => {
    setup()
    const searchedProduct = 'shirt'
    const searchInput = screen.getByTestId('search-input')
    expect(searchInput).toBeVisible()

    fireEvent.input(searchInput, {
      target: {
        value: searchedProduct,
      },
    })

    expect(searchInput).toHaveValue(searchedProduct)
  })

  it('should change quantity of item', async () => {
    setup()
    const listItem = screen.getAllByTestId('list-item')[0]
    const quantityInput = within(listItem).getByTestId('quantity-input')

    fireEvent.input(quantityInput, { target: { value: '' } })

    expect(quantityInput).toHaveValue('')

    fireEvent.input(quantityInput, { target: { value: '2' } })

    expect(quantityInput).toHaveValue('2')
  })

  it('should delete list item', async () => {
    setup()
    const itemsCount = listData.items.length
    const listItems = screen.getAllByTestId('list-item')
    const deleteBtn = within(listItems[1]).getByRole('button', { name: /delete/i })

    fireEvent.click(deleteBtn)

    await waitFor(() => {
      expect(listData.items.length).toBe(itemsCount - 1)
    })
  })

  it('should add non configurable product to list', async () => {
    setup()
    const b2bSearch = screen.getByTestId('product-search')
    const b2bSearchInput = within(b2bSearch).getByTestId('search-input')

    fireEvent.change(b2bSearchInput, { target: { value: nonConfigurableProductMock.productCode } })

    expect(b2bSearchInput).toHaveValue(nonConfigurableProductMock.productCode)
    const productSuggestion = within(b2bSearch).getByTestId('add-non-configurable-product-button')

    fireEvent.click(productSuggestion)

    await waitFor(() => {
      expect(screen.getByText(/pdt1/i)).toBeVisible()
    })
  })

  it('should handle configurable product', async () => {
    setup()
    const b2bSearch = screen.getByTestId('product-search')
    const b2bSearchInput = within(b2bSearch).getByTestId('search-input')

    fireEvent.change(b2bSearchInput, { target: { value: configurableProductMock.productCode } })

    expect(b2bSearchInput).toHaveValue(configurableProductMock.productCode)
    const productSuggestion = within(b2bSearch).getByTestId('add-configurable-product-button')

    fireEvent.click(productSuggestion)

    await waitFor(() => {
      expect(screen.getByText(/product-configuration-options/i)).toBeVisible()
    })
  })

  it('should add all items present in list to cart when users click on add all items to cart link', async () => {
    const { user } = setup()
    const addAllItemsToCartLink = screen.getByText(/add-all-items-to-cart/i)
    user.click(addAllItemsToCartLink)
    await waitFor(() => {
      expect(onHandleAddListToCartMock).toBeCalled()
    })
  })

  it('should reset the cart add all items present in list to cart when users click on empty cart and add all items to cart link', async () => {
    const { user } = setup()
    const emptyCartAndAddAllItemsToCartLink = screen.getByText(/empty-cart-add-list-to-cart/i)
    user.click(emptyCartAndAddAllItemsToCartLink)
    await waitFor(() => {
      expect(onHandleAddListToCartMock).toBeCalled()
    })
  })
})
