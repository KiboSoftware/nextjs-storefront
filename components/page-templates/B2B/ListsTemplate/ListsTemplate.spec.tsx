import React from 'react'

import { useMediaQuery } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import mockRouter from 'next-router-mock'

import * as stories from './ListsTemplate.stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { CreateListProps } from '@/components/b2b/Lists/CreateList/CreateList'
import { EditListProps } from '@/components/b2b/Lists/EditList/EditList'
import { ViewListsProps } from '@/components/b2b/Lists/ViewLists/ViewLists'

const { Common, ListsTemplateMobile } = composeStories(stories)

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

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))
const user = userEvent.setup()
const setup = () => {
  renderWithQueryClient(<Common />)
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
  '@/components/b2b/Lists/ViewLists/ViewLists',
  () =>
    function viewList({ onEditFormToggle, isEditFormOpen, onAddListToCart }: ViewListsProps) {
      return (
        <>
          {isEditFormOpen
            ? EditListMock({
                onEditFormToggle: onEditFormToggle,
                listData: {},
                onUpdateListData: () => console.log('updateList'),
                onHandleAddListToCart: () => console.log('addListToCart'),
              })
            : ListTableMock({ onEditFormToggle: onEditFormToggle })}

          <button
            data-testid="onAddListToCart-button"
            onClick={() => onAddListToCart(['item1', 'item2'])}
          ></button>
        </>
      )
    }
)

jest.mock('@/components/b2b/Lists/CreateList/CreateList', () => ({
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

describe('[component] - ListsTemplate Desktop', () => {
  beforeEach(() => {
    const useMediaQueryMock = useMediaQuery as jest.Mock
    useMediaQueryMock.mockReturnValue(true)
  })
  it('should render template', () => {
    setup()
    const heading = screen.getByRole('heading')
    const viewLists = screen.getByTestId('view-lists-mock')
    expect(heading).toBeVisible()
    expect(viewLists).toBeVisible()
  })

  it('should redirect to /my-account page when my-account button clicked', async () => {
    setup()
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
    setup()
    const createFormBtn = screen.getByTestId('create-new-list-btn')

    fireEvent.click(createFormBtn)

    const createList = screen.getByTestId('create-list')
    expect(createList).toBeVisible()
    const toggleCreateListBtn = within(createList).getByTestId('toggle-create-list')

    fireEvent.click(toggleCreateListBtn)

    expect(screen.getByTestId('view-lists-mock')).toBeVisible()
  })
})
describe('[component] - ListsTemplate Mobile', () => {
  beforeEach(() => {
    const useMediaQueryMock = useMediaQuery as jest.Mock
    useMediaQueryMock.mockReturnValue(false)
  })
  it('should redirect to /my-account page in mobile view when my-account button clicked', async () => {
    renderWithQueryClient(<ListsTemplateMobile {...ListsTemplateMobile.args} />)
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

  it('should toggle edit list form in mobile view when edit list button clicked', async () => {
    renderWithQueryClient(<ListsTemplateMobile {...ListsTemplateMobile.args} />)
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

  it('should redirect to my-account if clicked on my-account button', async () => {
    renderWithQueryClient(<ListsTemplateMobile {...ListsTemplateMobile.args} />)
    const myAccountBtn = screen.getByTestId('my-account-button')
    expect(myAccountBtn).toBeVisible()
    await user.click(myAccountBtn)
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: '/my-account',
        pathname: '/my-account',
      })
    })
  })

  it('should add list to cart', async () => {
    renderWithQueryClient(<ListsTemplateMobile {...ListsTemplateMobile.args} />)
    const addListToCartBtn = screen.getByTestId('onAddListToCart-button')

    await user.click(addListToCartBtn)
  })
})
