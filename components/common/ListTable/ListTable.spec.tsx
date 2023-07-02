import React from 'react'

import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ListTable.stories'

const { Common } = composeStories(stories)

function setup() {
  const user = userEvent.setup()
  render(<Common {...Common.args} />)
  return { user }
}

describe('[component] - ListTable', () => {
  it('should render the list table', () => {
    setup()
    const table = screen.getByRole('table')
    expect(table).toBeVisible()
  })
  it('should check for number of rows in list table', () => {
    setup()
    const tableRows = screen.getAllByRole('row')
    if (Common.args) {
      // adding one to length because using TableRow in the TableHead
      expect(tableRows.length).toEqual(Common.args.rows.length + 1)
    }
  })
})
