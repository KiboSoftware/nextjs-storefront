import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import { graphql } from 'msw'

import * as stories from './ViewLists.stories'
import { server } from '@/__mocks__/msw/server'
import { wishlistMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
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

const onDeleteListMock = jest.fn(),
  onEditListMock = jest.fn(),
  onCopyListMock = jest.fn()

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

jest.mock('@/components/my-account/Lists/ListTable/ListTable', () => ({
  __esModule: true,
  default: ({ onDeleteList, onEditList, onCopyList, rows }: any) => (
    <div data-testid="list-table-mock">
      {rows.map((row: any) => (
        <div key={row.name} data-testid="wishlists">
          {row.name}
        </div>
      ))}
      <button data-testid="edit-list-btn" onClick={onEditListMock}>
        Edit
      </button>
      <button
        data-testid="copy-list-btn"
        onClick={() => onCopyList('13cc2e5236615b000102f572000045d7')}
      >
        Copy
      </button>
      <button
        data-testid="delete-list-btn"
        onClick={() => onDeleteList('13cc2e5236615b000102f572000045d7')}
      >
        Delete
      </button>
    </div>
  ),
}))

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
    server.use(
      graphql.query('createWishlist', (_req, res, ctx) => {
        return res.once(
          ctx.data({
            copiedList,
          })
        )
      })
    )
    await waitFor(() => {
      const rows = within(listTable).getAllByTestId('wishlists')
      rows.forEach((row, i) => {
        expect(row.innerHTML).toEqual(wishlistMock.items[i].name)
      })
    })
  })

  it('should open dialog when click on delete list button', async () => {
    window.matchMedia = createMatchMedia(1000)
    const { user } = setup()
    const listTable = await screen.findByTestId('list-table-mock')
    const deleteBtn = within(listTable).getByTestId('delete-list-btn')

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

  // it.only('should close dialog when clicked on cancle button', async () => {
  //   window.matchMedia = createMatchMedia(1000)
  //   const { user } = setup()
  //   const listTable = await screen.findByTestId('list-table-mock')
  //   const deleteBtn = within(listTable).getByTestId('delete-list-btn')

  //   fireEvent.click(deleteBtn)

  //   const kiboDialog = screen.getByTestId('kibo-dialog')
  //   const cancelBtn = within(kiboDialog).getByText(/cancel/i)

  //   fireEvent.click(cancelBtn)

  //   expect(kiboDialog).not.toBeVisible()
  // })
})
