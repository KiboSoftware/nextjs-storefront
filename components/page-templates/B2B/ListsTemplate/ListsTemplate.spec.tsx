import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './ListsTemplate.stories'
const { Common } = composeStories(stories)

const setup = () => {
  const user = userEvent.setup()
  render(<Common />)
  return { user }
}

describe('[component] - ListsTemplate', () => {
  it('should render template', () => {
    setup()
    const heading = screen.getByRole('heading')
    expect(heading).toBeVisible()
  })
})
