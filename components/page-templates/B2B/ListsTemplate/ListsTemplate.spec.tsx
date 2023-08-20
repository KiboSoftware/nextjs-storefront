import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

import * as stories from './ListsTemplate.stories'
import { CreateListProps } from '@/components/my-account/Lists/CreateList/CreateList'
import { EditListProps } from '@/components/my-account/Lists/EditList/EditList'
import { ViewListsProps } from '@/components/my-account/Lists/ViewLists/ViewLists'

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

const ListTableMock = ({ onEditFormToggle }: { onEditFormToggle: () => void }) => (
  <div data-testid="view-lists-mock">
    <button data-testid="toggle-edit-form" onClick={() => onEditFormToggle()}></button>
  </div>
)

const EditListMock = ({ onEditFormToggle, listData, onUpdateListData }: EditListProps) => (
  <div data-testid="edit-list-mock">
    <button data-testid="toggle-edit-form" onClick={() => onEditFormToggle()}></button>
  </div>
)

jest.mock(
  '@/components/my-account/Lists/ViewLists/ViewLists',
  () =>
    ({ onEditFormToggle, isEditFormOpen }: ViewListsProps) =>
      isEditFormOpen
        ? EditListMock({
            onEditFormToggle: onEditFormToggle,
            listData: {},
            onUpdateListData: () => console.log('updateList'),
          })
        : ListTableMock({ onEditFormToggle: onEditFormToggle })
)

jest.mock('@/components/my-account/Lists/CreateList/CreateList', () => ({
  __esModule: true,
  default: ({ onCreateFormToggle }: CreateListProps) => {
    return (
      <div data-testid="create-list">
        <button data-testid="toggle-create-list" onClick={() => onCreateFormToggle(false)}>
          toggle-create-list
        </button>
      </div>
    )
  },
}))

describe('[component] - ListsTemplate', () => {
  it('should render template', () => {
    setup()
    const heading = screen.getByRole('heading')
    const viewLists = screen.getByTestId('view-lists-mock')
    expect(heading).toBeVisible()
    expect(viewLists).toBeVisible()
  })

  it('should redirect to /my-account page when my-account button clicked', async () => {
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

  it('should redirect to /my-account page in mobile view when my-account button clicked', async () => {
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

  it('should toggle edit list form when edit list button clicked', async () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const viewLists = screen.getByTestId('view-lists-mock')
    const editToggleBtn = within(viewLists).getByTestId('toggle-edit-form')

    fireEvent.click(editToggleBtn)

    const editList = screen.getByTestId('edit-list-mock')
    const editToggleBtnEditList = within(editList).getByTestId('toggle-edit-form')
    expect(editList).toBeVisible()
    expect(editToggleBtnEditList).toBeVisible()

    fireEvent.click(editToggleBtnEditList)

    expect(viewLists).toBeVisible()
  })

  it('should open create list form when create list button clicked', async () => {
    window.matchMedia = createMatchMedia(1024)
    setup()
    const createFormBtn = screen.getByTestId('create-new-list-btn')

    fireEvent.click(createFormBtn)

    const createList = screen.getByTestId('create-list')
    expect(createList).toBeVisible()
    const toggleCreateListBtn = within(createList).getByTestId('toggle-create-list')

    fireEvent.click(toggleCreateListBtn)

    expect(screen.getByTestId('view-lists-mock')).toBeVisible()
  })

  it('should toggle edit list form in mobile view when edit list button clicked', async () => {
    window.matchMedia = createMatchMedia(500)
    setup()
    const viewLists = screen.getByTestId('view-lists-mock')
    const editToggleBtn = within(viewLists).getByTestId('toggle-edit-form')

    fireEvent.click(editToggleBtn)

    const editList = screen.getByTestId('edit-list-mock')
    const editToggleBtnEditList = within(editList).getByTestId('toggle-edit-form')
    const editlistHeading = screen.getByText(/edit-list/i)
    expect(editList).toBeVisible()
    expect(editToggleBtnEditList).toBeVisible()
    expect(editlistHeading).toBeVisible()

    fireEvent.click(editToggleBtnEditList)

    expect(viewLists).toBeVisible()
  })
})
