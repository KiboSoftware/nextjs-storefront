import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './EditList.stories'

import { CrWishlistItem } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const { listData } = stories

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

describe('[componenet] - Edit list', () => {
  it('should render the component', () => {
    setup()
    expect(screen.getByText(listData.name)).toBeVisible()
    listData.items.forEach((item: CrWishlistItem) =>
      expect(screen.getByText(item?.product?.name as string)).toBeVisible()
    )
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
})
