import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyActions.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const user = userEvent.setup()

const { Common } = composeStories(stories)

const onAddMock = jest.fn()
const onEditMock = jest.fn()
const onAccessMock = jest.fn()

const mockCurrentAccount = { id: 1174 }

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasAnyPermission: jest.fn().mockImplementation(() => true),
}))

jest.mock('@/hooks', () => ({
  ...jest.requireActual('@/hooks'),
  useGetAccountsByUser: jest.fn(() => ({
    activeUsersAccount: [{ id: 1174 }, { id: 1175 }],
  })),
}))

jest.mock('@/context', () => ({
  ...jest.requireActual('@/context'),
  useAuthContext: jest.fn(() => ({
    user: { emailAddress: 'test@example.com' },
    selectedAccountId: 1174,
  })),
}))

describe('[components] AccountHierarchyActions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should render component', async () => {
    render(
      <Common
        currentAccount={mockCurrentAccount}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onAccess={onAccessMock}
        mdScreen={true}
      />
    )

    const treeLabel = screen.getByTestId('account-actions')
    expect(treeLabel).toBeVisible()

    const accountAddButton = screen.getByRole('button', { name: 'item-add' })
    await user.click(accountAddButton)
    expect(onAddMock).toHaveBeenCalled()

    const accountEditButton = screen.getByRole('button', { name: 'item-edit' })
    await user.click(accountEditButton)
    expect(onEditMock).toHaveBeenCalled()

    const accessButton = screen.getByText('access-account')
    await user.click(accessButton)
    expect(onAccessMock).toHaveBeenCalled()
  })

  it('should render AccountHierarchyActions on mobile screen and handle callbacks', async () => {
    render(
      <Common
        mdScreen={false}
        currentAccount={mockCurrentAccount}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onAccess={onAccessMock}
      />
    )

    const moreIcon = screen.getByLabelText('more')
    expect(moreIcon).toBeVisible()

    await user.click(moreIcon)

    const accessButton = screen.getByRole('menuitem', { name: 'Access Account' })
    await user.click(accessButton)
    expect(onAccessMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const accountEditButton = screen.getByRole('menuitem', { name: 'Edit account' })
    await user.click(accountEditButton)
    expect(onEditMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const addChildAccountButton = screen.getByRole('menuitem', { name: 'Add a child account' })
    await user.click(addChildAccountButton)
    expect(onAddMock).toHaveBeenCalled()
  })

  it('should render Add, Edit, and Access link when user has permissions', async () => {
    renderWithQueryClient(
      <Common
        mdScreen={true}
        currentAccount={mockCurrentAccount}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onAccess={onAccessMock}
      />
    )

    const accountAddButton = screen.getByRole('button', { name: 'item-add' })
    expect(accountAddButton).toBeVisible()

    const accountEditButton = screen.getByRole('button', { name: 'item-edit' })
    expect(accountEditButton).toBeVisible()

    const accessButton = screen.getByText('access-account')
    expect(accessButton).toBeVisible()
  })

  it('should render Access link when account is accessible', async () => {
    renderWithQueryClient(
      <Common
        mdScreen={true}
        currentAccount={mockCurrentAccount}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onAccess={onAccessMock}
      />
    )

    const accessButton = screen.getByText('access-account')
    expect(accessButton).toBeVisible()
  })
})
