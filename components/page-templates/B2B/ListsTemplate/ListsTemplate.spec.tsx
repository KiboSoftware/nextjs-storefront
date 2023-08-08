import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

import * as stories from './ListsTemplate.stories'
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

const setup = () => {
  const user = userEvent.setup()
  render(<Common />)
  return { user }
}

const handleEditFormToggle = jest.fn()

const ListTableMock = ({ onEditFormToggle }: { onEditFormToggle: () => void }) => (
  <div data-testid="view-lists-mock">
    <button data-testid="toggle-edit-form" onClick={onEditFormToggle}></button>
  </div>
)
jest.mock(
  '@/components/my-account/Lists/ViewLists/ViewLists',
  () => () => ListTableMock({ onEditFormToggle: handleEditFormToggle })
)

describe('[component] - ListsTemplate', () => {
  it('should render template', () => {
    setup()
    const heading = screen.getByRole('heading')
    const viewLists = screen.getByTestId('view-lists-mock')
    expect(heading).toBeVisible()
    expect(viewLists).toBeVisible()
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

  it('should toggle edit list form', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const viewLists = screen.getByTestId('view-lists-mock')
    const editToggleBtn = within(viewLists).getByTestId('toggle-edit-form')
    user.click(editToggleBtn)
    await waitFor(() => {
      expect(handleEditFormToggle).toBeCalledTimes(1)
    })
  })

  it('should open create list form', async () => {
    window.matchMedia = createMatchMedia(1024)
    const { user } = setup()
    const createFormBtn = screen.getByTestId('create-new-list-btn')
    user.click(createFormBtn)
    await waitFor(() => {
      const createFormHeading = screen.getByText(/create-new-list/i)
      expect(createFormHeading).toBeVisible()
    })
  })
})
