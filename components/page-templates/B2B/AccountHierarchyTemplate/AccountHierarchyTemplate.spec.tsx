/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import mediaQuery from 'css-mediaquery'
import { useRouter } from 'next/router'

import * as stories from './AccountHierarchyTemplate.stories' // import all stories from the stories file
import { renderWithQueryClient } from '@/__test__/utils'

const { Common } = composeStories(stories)

// Mock
const onCloseMock = jest.fn()

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

const AccountHierarchyFormMock = ({ onClose }: { onClose: () => void }) => (
  <div data-testid="account-hierarchy-form-mock">
    <button data-testid="cancel-account-mock-button" onClick={onClose}>
      Cancel
    </button>
    <button data-testid="save-account-mock-button" onClick={onClose}>
      Save
    </button>
  </div>
)
jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyForm/AccountHierarchyForm',
  () => () => AccountHierarchyFormMock({ onClose: onCloseMock })
)

const UserTableMock = () => <div data-testid="user-table-mock"></div>
jest.mock('@/components/b2b/User/UserTable/UserTable', () => () => UserTableMock())

const QuotesTableMock = () => <div data-testid="quotes-table-mock"></div>
jest.mock('@/components/b2b/QuotesTable/QuotesTable', () => () => QuotesTableMock())
jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))
jest.mock('@/components/b2b/AccountHierarchy/AccountHierarchyTree/AccountHierarchyTree', () => ({
  __esModule: true,
  default: ({
    handleViewAccount,
    handleAddAccount,
    handleEditAccount,
    handleChangeParent,
    handleSwapAccount,
    handleBuyersBtnClick,
    handleQuotesBtnClick,
  }: any) => (
    <div data-testid="account-hierarchy-tree-mock">
      <button onClick={handleViewAccount}>handleViewAccount</button>
      <button onClick={handleAddAccount}>handleAddAccount</button>
      <button onClick={handleEditAccount}>handleEditAccount</button>
      <button onClick={handleChangeParent}>handleChangeParent</button>
      <button onClick={handleSwapAccount}>handleSwapAccount</button>
      <button onClick={() => handleBuyersBtnClick(1)}>handleBuyersBtnClick</button>
      <button onClick={handleQuotesBtnClick}>handleQuotesBtnClick</button>
    </div>
  ),
}))

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const setup = () => {
  const user = userEvent.setup()
  renderWithQueryClient(<Common />)
  return {
    user,
  }
}

describe('[component] - AccountHierarchyTemplate', () => {
  it('should render component', async () => {
    setup()

    const heading = screen.getByText('account-hierarchy')
    expect(heading).toBeVisible()

    const addUserButton = screen.getByText('add-child-account')
    expect(addUserButton).toBeVisible()

    const accountHierarchyTreeMock = screen.getByTestId('account-hierarchy-tree-mock')
    expect(accountHierarchyTreeMock).toBeVisible()
  })

  it('should open add child account form in dialog when add child account button clicked', async () => {
    const { user } = setup()

    const addChildAccountButton = screen.getByText('add-child-account')
    user.click(addChildAccountButton)
  })

  it('should navigate to "/my-account" when account title is clicked', async () => {
    window.matchMedia = createMatchMedia(1400)

    const mockPush = jest.fn()
    ;(useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    })

    setup()

    const accountTitleElement = screen.getByText(/my-account/i)
    fireEvent.click(accountTitleElement)

    expect(mockPush).toHaveBeenCalledWith('/my-account')
  })

  it('should show ViewAccountDetailsDialog when handleViewAccount is called', async () => {
    const { user } = setup()

    const handleViewAccountButton = screen.getByText('handleViewAccount')

    await user.click(handleViewAccountButton)

    await waitFor(() => {
      const viewAccountDetailsDialog = screen.getByRole('dialog', { name: 'view-account' })
      expect(viewAccountDetailsDialog).toBeVisible()
    })
  })

  it('should show AccountHierarchyFormDialog when handleAddAccount is called', async () => {
    const { user } = setup()

    const handleAddAccountButton = screen.getByText('handleAddAccount')
    await user.click(handleAddAccountButton)

    await waitFor(() => {
      const accountHierarchyFormDialog = screen.getByRole('dialog', { name: 'add-child-account' })
      expect(accountHierarchyFormDialog).toBeVisible()
    })
  })

  it('should show AccountHierarchyFormDialog when handleEditAccount is called', async () => {
    const { user } = setup()

    const handleEditAccountButton = screen.getByText('handleEditAccount')
    await user.click(handleEditAccountButton)

    await waitFor(() => {
      const accountHierarchyFormDialog = screen.getByRole('dialog', { name: 'edit-child-account' })
      expect(accountHierarchyFormDialog).toBeVisible()
    })
  })

  it('should show AccountHierarchyChangeParentDialog when handleChangeParent is called', async () => {
    const { user } = setup()

    const handleChangeParentButton = screen.getByText('handleChangeParent')
    await user.click(handleChangeParentButton)

    await waitFor(() => {
      const accountHierarchyChangeParentDialog = screen.getByRole('dialog', {
        name: 'edit-child-account',
      })
      expect(accountHierarchyChangeParentDialog).toBeVisible()
    })
  })

  it('should show ConfirmationDialog when handleSwapAccount is called', async () => {
    const { user } = setup()

    const handleSwapAccountButton = screen.getByText('handleSwapAccount')
    await user.click(handleSwapAccountButton)

    await waitFor(() => {
      const confirmationDialog = screen.getByRole('dialog', { name: 'swap-account-hierarchy' })
      expect(confirmationDialog).toBeVisible()
    })
  })

  it('should show Buyers List when handleBuyersBtnClick is called', async () => {
    const { user } = setup()

    const handleBuyersBtnClickButton = screen.getByText('handleBuyersBtnClick')
    await user.click(handleBuyersBtnClickButton)

    await waitFor(() => {
      const buyersList = screen.getByTestId('user-table-mock')
      expect(buyersList).toBeVisible()
    })
  })

  it('should show Quotes List when handleQuotesBtnClick is called', async () => {
    const { user } = setup()

    const handleQuotesBtnClickButton = screen.getByText('handleQuotesBtnClick')
    await user.click(handleQuotesBtnClickButton)

    await waitFor(() => {
      const quotesList = screen.getByTestId('quotes-table-mock')
      expect(quotesList).toBeVisible()
    })
  })
})
