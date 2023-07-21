import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
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

function setup() {
  const user = userEvent.setup()
  render(
    <Table
      {...Table.args}
      onCopyList={onCopyMock}
      onEditList={onEditMock}
      onDeleteList={onDeleteMock}
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
    const initiateQuoteBtns = screen.getAllByTestId('initiateQuoteBtn')
    const addToCartBtns = screen.getAllByTestId('addToCartBtn')
    expect(table).toBeVisible()
    tableRows.forEach((row) => expect(row).toBeVisible())
    editBtns.forEach((btn) => expect(btn).toBeVisible())
    deleteBtns.forEach((btn) => expect(btn).toBeVisible())
    copyBtns.forEach((btn) => expect(btn).toBeVisible())
    initiateQuoteBtns.forEach((btn) => expect(btn).toBeVisible())
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
})
