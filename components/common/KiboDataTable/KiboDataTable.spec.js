import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './KiboDataTable.stories' // import all stories from the stories file

const { KiboDataTable, DataTable } = composeStories(stories)

describe('[component] - KiboDataTable', () => {
  it('should render table', () => {
    render(<KiboDataTable {...DataTable.args} />)
    expect(screen.getByText(DataTable.args.rows)).toBeVisible()
  })
})
