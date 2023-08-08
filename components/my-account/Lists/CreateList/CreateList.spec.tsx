import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

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

const onCreateFormToggleMock = jest.fn()

function setup() {
  const user = userEvent.setup()
  render(<Common {...Common.args} onCreateFormToggle={onCreateFormToggleMock} />)
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

  it('should redirect to /my-account page in mobile view', async () => {
    window.matchMedia = createMatchMedia(500)
    const { user } = setup()
    const myAccountBtn = screen.getByTestId('my-account-button')
    expect(myAccountBtn).toBeVisible()
    user.click(myAccountBtn)
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
      })
    })
  })

  it('should redirect to /my-account page', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const myAccountBtn = screen.getByTestId('my-account-button')
    expect(myAccountBtn).toBeVisible()
    user.click(myAccountBtn)
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
      })
    })
  })

  it('should cancel create form', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const cancelBtn = screen.getByText(/cancel/i)
    expect(cancelBtn).toBeVisible()

    user.click(cancelBtn)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalled()
    })
  })

  it.only('should save and close create form', async () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const saveAndCloseBtn = screen.getByText(/save-and-close/i)
    expect(saveAndCloseBtn).toBeVisible()
    expect(saveAndCloseBtn).toBeDisabled()

    const listNameInput = screen.getByPlaceholderText(/name-this-list/i)

    fireEvent.change(listNameInput, { target: { value: 'New List' } })

    expect(listNameInput).toHaveValue('New List')
    expect(saveAndCloseBtn).toBeEnabled()

    fireEvent.click(saveAndCloseBtn)

    await waitFor(() => {
      expect(onCreateFormToggleMock).toBeCalled()
    })
  })
})
