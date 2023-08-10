import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './EditList.stories'
import { B2BProductSearchProps } from '@/components/b2b/B2BProductSearch/B2BProductSearch'

import { CrWishlistItem } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const { listData } = stories

const onEditFormToggleMock = jest.fn()
const onUpdateListDataMock = jest.fn()

jest.mock('@/components/my-account/Lists/ListItem/ListItem', () => ({
  __esModule: true,
  default: ({ item, onChangeQuantity, onDeleteItem }: any) => {
    return (
      <div data-testid="list-item">
        <div data-testid="item-code">{item?.product?.productCode}</div>
        <div data-testid="item-name">{item?.product?.productName}</div>
        <div data-testid="item-quantity">{item?.quantity}</div>
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
    />
  )
  return { user }
}

describe('[componenet] - Edit list', () => {
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
    const { user } = setup()
    const newListName = 'New List Name'
    const editBtn = screen.getByTestId('editNameBtn')
    user.click(editBtn)
    await waitFor(() => {
      expect(editBtn).not.toBeVisible()
    })
    await waitFor(() => {
      const editNameInput = screen.getByTestId('editNameInput')
      expect(editNameInput).toBeVisible()
      user.clear(editNameInput)
      user.type(editNameInput, newListName)
    })
    await waitFor(() => {
      const editNameInput = screen.getByTestId('editNameInput')
      expect(editNameInput).toHaveValue(newListName)
    })
    await waitFor(() => {
      const saveBtn = screen.getByTestId('saveNameBtn')
      user.click(saveBtn)
    })
    await waitFor(() => {
      expect(screen.getByText(newListName)).toBeVisible()
    })
  })

  it('should close edit list', async () => {
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
})
