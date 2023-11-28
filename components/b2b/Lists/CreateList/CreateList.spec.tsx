import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within, cleanup, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

import * as stories from './CreateList.stories'
import { B2BProductSearchProps } from '@/components/b2b/B2BProductSearch/B2BProductSearch'
import { AuthContext, ModalContextProvider } from '@/context'

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

const configurableProductMock = {
  ...nonConfigurableProductMock,
  options: [
    {
      isRequired: true,
    },
  ],
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
  const userContextValues = {
    isAuthenticated: true,
    user: {
      id: 1075,
    },
    login: jest.fn(),
    createAccount: jest.fn(),
    logout: jest.fn(),
  }

  render(
    <AuthContext.Provider value={userContextValues}>
      <ModalContextProvider>
        <Common {...Common.args} onCreateFormToggle={onCreateFormToggleMock} />
      </ModalContextProvider>
    </AuthContext.Provider>
  )
  return { user }
}

afterEach(() => {
  cleanup()
})
describe('[component] - Create List', () => {
  it('should render the component', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()

    expect(screen.getByText(/create-new-list/i)).toBeVisible()
    expect(screen.getByText(/save-and-close/i)).toBeVisible()
    expect(screen.getByText(/my-account/i)).toBeVisible()
    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)
    fireEvent.change(listNameInput, { target: { value: 'New List' } })
    expect(screen.getByPlaceholderText(/name-this-list/i)).toBeVisible()
    await waitFor(() => {
      const productSearch = screen.getByTestId('product-search')
      expect(productSearch).toBeVisible()
    })
    await waitFor(() => {
      const productSearch = screen.getByTestId('product-search')
      expect(within(productSearch).getByTestId('search-input')).toBeVisible()
    })
  })

  it('should handle creating list ', async () => {
    const { user } = setup()
    const newListName = 'test list 1'
    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)
    user.type(listNameInput, newListName)
    await waitFor(() => {
      expect(listNameInput).toHaveValue(newListName)
    })

    user.tab()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /save-and-close/i })).toBeEnabled()
    })

    user.click(screen.getByTestId('add-non-configurable-product-button'))

    user.click(screen.getByTestId('add-configurable-product-button'))

    await waitFor(() => {
      expect(screen.getByText('product-configuration-options')).toBeVisible()
    })

    const emptyCartAndAddListToCart = screen.getByText('empty-cart-add-list-to-cart')

    await waitFor(() => {
      expect(emptyCartAndAddListToCart).toBeVisible()
    })

    user.click(emptyCartAndAddListToCart)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalledWith(false)
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
    fireEvent.blur(listNameInput)
    expect(listNameInput).toHaveValue('New List')
    await waitFor(() => {
      expect(saveAndCloseBtn).toBeEnabled()
    })

    fireEvent.click(saveAndCloseBtn)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalled()
    })
  })
})
