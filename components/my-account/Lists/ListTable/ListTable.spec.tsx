import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
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

function setup() {
  const user = userEvent.setup()
  render(<Table {...Table.args} />)
  return { user }
}

describe('[component] - ListTable', () => {
  it('should render the list table', () => {
    setup()
    const table = screen.getByRole('table')
    expect(table).toBeVisible()
  })
  it('should check for number of rows in list table and rows are visible', () => {
    setup()
    const tableRows = screen.getAllByRole('row')
    if (Table.args?.rows) {
      // adding one to length because using TableRow in the TableHead
      expect(tableRows.length).toEqual(Table.args.rows.length + 1)
    }
    tableRows.forEach((row) => expect(row).toBeVisible())
  })
  it('should check for buttons in rows to be visible in desktop view ', () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const editBtns = screen.getAllByTestId('editBtn')
    const deleteBtns = screen.getAllByTestId('deleteBtn')
    const copyBtns = screen.getAllByTestId('copyBtn')
    const initiateQuoteBtns = screen.getAllByTestId('initiateQuoteBtn')
    const addToCartBtns = screen.getAllByTestId('addToCartBtn')
    console.log(editBtns, deleteBtns, copyBtns, initiateQuoteBtns, addToCartBtns)
  })
  it('should check for menu button in rows to be visible in mobile view', () => {
    window.matchMedia = createMatchMedia(500)
    setup()
    const menuBtn = screen.getAllByTestId('menuBtn')
    console.log(menuBtn)
  })
})
