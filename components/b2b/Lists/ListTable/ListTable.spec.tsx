import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './ListTable.stories'

const { Table } = composeStories(stories)

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

const onEditMock = jest.fn()
const onCopyMock = jest.fn()
const onDeleteMock = jest.fn()
const onAddListToCartMock = jest.fn()
const onEmptyCartAndAddListToCartMock = jest.fn()

function setup() {
  const user = userEvent.setup()
  render(
    <Table
      {...Table.args}
      onCopyList={onCopyMock}
      onEditList={onEditMock}
      onDeleteList={onDeleteMock}
      onAddListToCart={onAddListToCartMock}
      onEmptyCartAndAddListToCart={onEmptyCartAndAddListToCartMock}
    />
  )
  return { user }
}

describe('[component] - ListTable', () => {
  it('should render component on desktop', () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const table = screen.getByRole('table')
    const tableRows = screen.getAllByRole('row')
    const editBtns = screen.getAllByTestId('editBtn')
    const deleteBtns = screen.getAllByTestId('deleteBtn')
    const copyBtns = screen.getAllByTestId('copyBtn')
    const addToCartBtns = screen.getAllByTestId('addToCartBtn')
    expect(table).toBeVisible()
    tableRows.forEach((row) => expect(row).toBeVisible())
    editBtns.forEach((btn) => expect(btn).toBeVisible())
    deleteBtns.forEach((btn) => expect(btn).toBeVisible())
    copyBtns.forEach((btn) => expect(btn).toBeVisible())
    addToCartBtns.forEach((btn) => expect(btn).toBeVisible())
  })

  it('should render component on mobile', () => {
    window.matchMedia = createMatchMedia(500)
    setup()
    const table = screen.getByRole('table')
    const tableRows = screen.getAllByRole('row')
    const menuBtn = screen.getAllByTestId('menuBtn')
    expect(table).toBeVisible()
    tableRows.forEach((row) => expect(row).toBeVisible())
    menuBtn.forEach((btn) => expect(btn).toBeVisible())
  })

  it('should call callback function when user clicks on Edit button', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const editBtns = screen.getAllByTestId('editBtn')
    editBtns.forEach((btn) => {
      user.click(btn)
    })
    await waitFor(() => {
      expect(onEditMock).toBeCalledTimes(editBtns.length)
    })
  })

  it('should call callback function when user clicks on Delete button', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const deleteBtns = screen.getAllByTestId('deleteBtn')
    deleteBtns.forEach((btn) => {
      user.click(btn)
    })
    await waitFor(() => {
      expect(onDeleteMock).toBeCalledTimes(deleteBtns.length)
    })
  })

  it('should call callback function when user clicks on Copy button', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const copyBtns = screen.getAllByTestId('copyBtn')
    copyBtns.forEach((btn) => {
      user.click(btn)
    })
    await waitFor(() => {
      expect(onCopyMock).toBeCalledTimes(copyBtns.length)
    })
  })

  it('should call callback function when user clicks on Add To Cart button', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const addToCartBtns = screen.getAllByTestId('addToCartBtn')
    addToCartBtns.forEach((btn) => {
      user.click(btn)
    })
    await waitFor(() => {
      expect(onAddListToCartMock).toBeCalledTimes(addToCartBtns.length)
    })
  })

  it('should call callback function when user clicks on Reset and Add To Cart button', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const resetAndAddToCartBtns = screen.getAllByTestId('resetAndAddToCartBtn')
    resetAndAddToCartBtns.forEach((btn) => {
      user.click(btn)
    })
    await waitFor(() => {
      expect(onEmptyCartAndAddListToCartMock).toBeCalledTimes(resetAndAddToCartBtns.length)
    })
  })

  it('should open menu on mobile when user clicks on the list table menu', async () => {
    window.matchMedia = createMatchMedia(500)
    const { user } = setup()
    const menuBtns = screen.getAllByTestId('menuBtn')
    menuBtns.forEach((menuBtn) => expect(menuBtn).toBeVisible())
    user.click(menuBtns[0])
    await waitFor(() => {
      const menus = screen.getAllByTestId('menu')
      expect(menus[0]).toBeVisible()
    })
  })

  it('should check for callback function when option is clicked in the menu', async () => {
    window.matchMedia = createMatchMedia(500)
    setup()
    const menuBtns = screen.getAllByTestId('menuBtn')
    menuBtns.forEach((menuBtn) => expect(menuBtn).toBeVisible())

    fireEvent.click(menuBtns[0])

    const menus = screen.getAllByTestId('menu')
    expect(menus[0]).toBeVisible()
    const editBtn = within(menus[0]).getByText(/edit/i)
    const duplicateBtn = within(menus[0]).getByText(/duplicate/i)
    const deleteBtn = within(menus[0]).getByText(/delete/i)
    const addToCartBtn = within(menus[0]).getByText(/add-list-items-to-cart/i)

    fireEvent.click(editBtn)
    expect(onEditMock).toBeCalled()

    fireEvent.click(deleteBtn)
    expect(onDeleteMock).toBeCalled()

    fireEvent.click(duplicateBtn)
    expect(onCopyMock).toBeCalled()

    fireEvent.click(addToCartBtn)
    expect(onAddListToCartMock).toBeCalled()
  })
})
