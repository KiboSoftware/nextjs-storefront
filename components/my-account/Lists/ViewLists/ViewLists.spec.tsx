import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'

import * as stories from './ViewLists.stories'
import { renderWithQueryClient } from '@/__test__/utils'
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

const onDeleteListMock = jest.fn(),
  onEditListMock = jest.fn(),
  onCopyListMock = jest.fn()

const ListTableMock = ({
  onDeleteList,
  onEditList,
  onCopyList,
}: {
  onDeleteList: () => void
  onCopyList: () => void
  onEditList: () => void
}) => (
  <div data-testid="list-table-mock">
    <button data-testid="edit-list-btn" onClick={onEditList}></button>
    <button data-testid="copy-list-btn" onClick={onCopyList}></button>
    <button data-testid="delete-list-btn" onClick={onDeleteList}></button>
  </div>
)

jest.mock(
  '@/components/my-account/Lists/ListTable/ListTable',
  () => () =>
    ListTableMock({
      onCopyList: onCopyListMock,
      onEditList: onEditListMock,
      onDeleteList: onDeleteListMock,
    })
)

const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(<Common />)
  return { user }
}

describe('[componenet] - ViewLists', () => {
  it('should render loader for ViewLists', () => {
    setup()
    const loader = screen.getByRole('progressbar')
    expect(loader).toBeVisible
  })

  it('should render ViewLists component', async () => {
    window.matchMedia = createMatchMedia(1000)
    setup()
    const currentUserFilterCheckbox = await screen.findByTestId('currentUserFilterCheckbox')
    const pagination = await screen.findByTestId('pagination')
    const listTable = await screen.findByTestId('list-table-mock')
    expect(currentUserFilterCheckbox).toBeVisible()
    expect(pagination).toBeVisible()
    expect(listTable).toBeVisible()
  })

  it('should check for edit list button in ListTable', async () => {
    window.matchMedia = createMatchMedia(1000)
    const { user } = setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const editBtn = within(listTable).getByTestId('edit-list-btn')
    user.click(editBtn)
    await waitFor(() => {
      expect(onEditListMock).toBeCalledTimes(1)
    })
  })

  it('should check for copy list button in ListTable', async () => {
    window.matchMedia = createMatchMedia(1000)
    const { user } = setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const copyBtn = within(listTable).getByTestId('copy-list-btn')
    user.click(copyBtn)
    await waitFor(() => {
      expect(onCopyListMock).toBeCalledTimes(1)
    })
  })

  it('should check for delete list button in ListTable', async () => {
    window.matchMedia = createMatchMedia(1000)
    const { user } = setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const deleteBtn = within(listTable).getByTestId('delete-list-btn')
    user.click(deleteBtn)
    await waitFor(() => {
      expect(onDeleteListMock).toBeCalledTimes(1)
    })
  })
})
