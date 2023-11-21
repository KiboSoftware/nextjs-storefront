import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import { graphql } from 'msw'

import * as stories from './ViewLists.stories'
import { server } from '@/__mocks__/msw/server'
import { renderWithQueryClient } from '@/__test__/utils'
import { EditListProps } from '@/components/b2b/Lists/EditList/EditList'
import { KiboDialogProps } from '@/components/common/KiboDialog/KiboDialog'

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

const copiedList = {
  customerAccountId: 1143,
  name: 'Wishlist 3 - copy',
  id: '13cc2e5236615b000102f572000045d7',
  auditInfo: {
    createBy: 'abc@kibocommerce.com',
    createDate: new Date().getTime(),
  },
  items: [],
}

const onEditFormToggleMock = jest.fn()

jest.mock('@/components/common/KiboDialog/KiboDialog', () => ({
  __esModule: true,
  default: (props: KiboDialogProps) => {
    const { Title, Content, Actions } = props
    return (
      <div data-testid="kibo-dialog">
        {Title}
        <br />
        {Content}
        <br />
        {Actions}
        <br />
      </div>
    )
  },
}))

jest.mock('@/components/b2b/Lists/ListTable/ListTable', () => ({
  __esModule: true,
  default: ({ onDeleteList, onEditList, onCopyList, rows }: any) => (
    <div data-testid="list-table-mock">
      {rows.map((item: any) => (
        <React.Fragment key={item.id}>
          <div key={item.name} data-testid="wishlist">
            {item.name}
            <button data-testid="edit-list-btn" onClick={onEditList}>
              Edit
            </button>
            <button
              data-testid="copy-list-btn"
              onClick={() => {
                onCopyList(item.id)
              }}
            >
              Copy
            </button>
            <button
              data-testid="delete-list-btn"
              onClick={() => {
                onDeleteList(item.id)
              }}
            >
              Delete
            </button>
          </div>
        </React.Fragment>
      ))}
    </div>
  ),
}))

jest.mock('@/components/b2b/Lists/EditList/EditList', () => ({
  __esModule: true,
  default: ({ onEditFormToggle, listData, onUpdateListData }: EditListProps) => {
    return <div data-testid="edit-list"></div>
  },
}))

const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(<Common onEditFormToggle={onEditFormToggleMock} />)
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
    const rows = await within(listTable).findAllByTestId('wishlist')
    const editBtn = within(rows[0]).getByTestId('edit-list-btn')

    user.click(editBtn)

    await waitFor(() => {
      expect(onEditFormToggleMock).toBeCalled()
    })
  })

  it('should check for copy list button in ListTable', async () => {
    window.matchMedia = createMatchMedia(1000)
    const { user } = setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const rows = await within(listTable).findAllByTestId('wishlist')
    const copyBtn = within(rows[0]).getByTestId('copy-list-btn')

    await user.click(copyBtn)
  })

  it('should open dialog when click on delete list button', async () => {
    window.matchMedia = createMatchMedia(1000)
    setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const rows = await within(listTable).findAllByTestId('wishlist')
    const deleteBtn = within(rows[0]).getByTestId('delete-list-btn')

    fireEvent.click(deleteBtn)

    const kiboDialog = screen.getByTestId('kibo-dialog')
    expect(kiboDialog).toBeVisible()

    const cancelBtn = within(kiboDialog).getByText(/cancel/i)
    const deleteMessage = within(kiboDialog).getByText(/delete-list-message/i)
    const deleteBtnDialog = within(kiboDialog).getByText('delete')
    expect(cancelBtn).toBeVisible()
    expect(deleteBtnDialog).toBeVisible()
    expect(deleteMessage).toBeVisible()
  })

  it('should close delete dialog when cancle button clicked', async () => {
    window.matchMedia = createMatchMedia(1000)
    setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const rows = await within(listTable).findAllByTestId('wishlist')
    const deleteBtn = within(rows[0]).getByTestId('delete-list-btn')

    fireEvent.click(deleteBtn)

    const kiboDialog = screen.getByTestId('kibo-dialog')
    const cancelBtn = within(kiboDialog).getByText(/cancel/i)

    fireEvent.click(cancelBtn)

    expect(kiboDialog).not.toBeVisible()
  })

  it('should close delete dialog when delete button clicked', async () => {
    window.matchMedia = createMatchMedia(1000)
    setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const rows = within(listTable).getAllByTestId('wishlist')
    const deleteBtn = within(rows[0]).getByTestId('delete-list-btn')

    fireEvent.click(deleteBtn)

    const kiboDialog = screen.getByTestId('kibo-dialog')
    const dialogDeleteBtn = within(kiboDialog).getByText('delete')

    fireEvent.click(dialogDeleteBtn)

    await waitFor(() => {
      expect(kiboDialog).not.toBeVisible()
    })
  })
})
