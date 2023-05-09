import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render } from '@testing-library/react'

import * as stories from './UserTable.stories' // import all stories from the stories file

const { UserTableComponent } = composeStories(stories)

describe('[component] - KiboDataTable', () => {
  it('should render table', () => {
    render(<UserTableComponent />)
  })
})
