import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './CreateList.stories'

const { Common } = composeStories(stories)

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
  render(<Common {...Common.args} />)
  return { user }
}

describe('[componenet] - Create List', () => {
  it('should render the component', () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    expect(screen.getByText(/create-new-list/i)).toBeVisible()
    expect(screen.getByText(/save-and-close/i)).toBeVisible()
    expect(screen.getByText(/my-account/i)).toBeVisible()
    expect(screen.getByPlaceholderText(/name-this-list/i)).toBeVisible()
  })

  it('should change list name input', async () => {
    const { user } = setup()
    const newListName = 'New List'
    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)
    user.type(listNameInput, newListName)
    await waitFor(() => {
      expect(listNameInput).toHaveValue(newListName)
    })
  })
})
