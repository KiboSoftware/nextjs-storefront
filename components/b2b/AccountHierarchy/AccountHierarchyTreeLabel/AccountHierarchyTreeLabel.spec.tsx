import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyTreeLabel.stories'
import { b2BAccountHierarchyResult, userResponseMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'

const { Admin, NonPurchaser } = composeStories(stories)

const handleAddAccountMock = jest.fn()
const handleEditAccountMock = jest.fn()
const handleChangeParentMock = jest.fn()
const handleBuyersBtnClickMock = jest.fn()
const handleQuotesBtnClickMock = jest.fn()
const handleViewAccountMock = jest.fn()

const companyOrOrganizationName = b2BAccountHierarchyResult?.accounts?.[0]?.companyOrOrganization

jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyActions/AccountHierarchyActions',
  () => ({
    __esModule: true,
    default: ({ onAdd, onEdit, onView, onBuyersClick, onQuotesClick }: any) => (
      <div data-testid="account-hierarchy-actions-mock">
        <button onClick={onAdd}>Add</button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onView}>View</button>
        <button onClick={onBuyersClick}>Buyers</button>
        <button onClick={onQuotesClick}>Quotes</button>
      </div>
    ),
  })
)

const user = userEvent.setup()

const props = {
  handleEditAccount: handleEditAccountMock,
  handleAddAccount: handleAddAccountMock,
  handleBuyersBtnClick: handleBuyersBtnClickMock,
  handleChangeParent: handleChangeParentMock,
  handleQuotesBtnClick: handleQuotesBtnClickMock,
  handleViewAccount: handleViewAccountMock,
}

describe('[components] AccountHierarchyTreeLabel', () => {
  it('should render component', async () => {
    renderWithQueryClient(<Admin {...props} />)

    const treeLabel = screen.getByTestId('tree-label')
    expect(treeLabel).toBeVisible()

    const companyOrOrganization = screen.getByText(companyOrOrganizationName)
    expect(companyOrOrganization).toBeVisible()
  })

  it('should render all action buttons in Admin View', async () => {
    renderWithQueryClient(<Admin {...props} />)

    const listItemIcon = screen.getByTestId('account-hierarchy-actions-mock')
    expect(listItemIcon).toBeVisible()

    const accountAddButton = screen.getByRole('button', { name: 'Add' })
    expect(accountAddButton).toBeVisible()
    await user.click(accountAddButton)
    expect(handleAddAccountMock).toHaveBeenCalledWith({
      isAddingAccountToChild: true,
      accounts: [Admin.args?.currentAccount],
    })

    const buyerButton = screen.getByRole('button', { name: 'Buyers' })
    expect(buyerButton).toBeVisible()
    await user.click(buyerButton)
    expect(handleBuyersBtnClickMock).toHaveBeenCalledWith(Admin.args?.currentAccount?.users)

    const quoteButton = screen.getByRole('button', { name: 'Quotes' })
    expect(quoteButton).toBeVisible()
    await user.click(quoteButton)
    expect(handleQuotesBtnClickMock).toHaveBeenCalledWith(Admin.args?.currentAccount?.id)

    const accountViewButton = screen.getByRole('button', { name: 'View' })
    expect(accountViewButton).toBeVisible()
    await user.click(accountViewButton)
    expect(handleViewAccountMock).toHaveBeenCalledWith(Admin.args?.currentAccount)
  })

  it("Update the parent account when the user's account differs, triggered by clicking 'Edit Account'", async () => {
    renderWithQueryClient(<Admin {...props} />)

    const accountEditButton = screen.getByRole('button', { name: 'Edit' })
    expect(accountEditButton).toBeVisible()
    await user.click(accountEditButton)

    await waitFor(() => {
      expect(handleChangeParentMock).toHaveBeenCalledWith({
        accounts: Admin.args?.accounts,
        b2BAccount: Admin.args?.currentAccount,
      })
    })
  })

  it("should handle Edit Account button click when user's account is same as the current account", async () => {
    renderWithQueryClient(<Admin customerAccount={{ ...userResponseMock, id: 1174 }} {...props} />)

    const accountEditButton = screen.getByRole('button', { name: 'Edit' })
    expect(accountEditButton).toBeVisible()
    await user.click(accountEditButton)

    await waitFor(() => {
      expect(handleEditAccountMock).toHaveBeenCalledWith({
        accounts: Admin.args?.accounts,
        b2BAccount: Admin.args?.currentAccount,
      })
    })
  })
})
