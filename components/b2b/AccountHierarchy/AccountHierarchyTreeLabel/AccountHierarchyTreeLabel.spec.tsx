import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyTreeLabel.stories'
import { userResponseMock } from '@/__mocks__/stories'

const { Admin, Purchaser, NonPurchaser } = composeStories(stories)

const onAddMock = jest.fn()
const onEditMock = jest.fn()
const onViewMock = jest.fn()
const onDisableMock = jest.fn()
const onBuyerClickMock = jest.fn()
const onQuotesClickMock = jest.fn()
interface AccountHierarchyActionsMockProps {
  onAdd: () => void
  onEdit: () => void
  onDisable: () => void
  onView: () => void
  onBuyerClick: () => void
  onQuotesClick: () => void
}

const companyOrOrganizationName = userResponseMock?.companyOrOrganization as string

const AccountHierarchyActionsMock = ({
  onAdd,
  onEdit,
  onDisable,
  onView,
  onBuyerClick,
  onQuotesClick,
}: AccountHierarchyActionsMockProps) => (
  <div data-testid="account-hierarchy-actions-mock">
    <button data-testid="item-add-mock-button" onClick={onAdd}>
      Add
    </button>
    <button data-testid="item-edit-mock-button" onClick={onEdit}>
      Edit
    </button>
    <button data-testid="item-disable-mock-button" onClick={onDisable}>
      Disable
    </button>
    <button data-testid="item-view-mock-button" onClick={onView}>
      View
    </button>
    <button data-testid="buyer-mock-button" onClick={onBuyerClick}>
      Buyers
    </button>
    <button data-testid="quote-mock-button" onClick={onQuotesClick}>
      Quotes
    </button>
  </div>
)

jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyActions/AccountHierarchyActions',
  () => () =>
    AccountHierarchyActionsMock({
      onAdd: onAddMock,
      onEdit: onEditMock,
      onDisable: onDisableMock,
      onView: onViewMock,
      onBuyerClick: onBuyerClickMock,
      onQuotesClick: onQuotesClickMock,
    })
)

describe('AccountHierarchyTreeLabel', () => {
  it('should render component', async () => {
    render(<Admin />)

    const treeLabel = screen.getByTestId('tree-label')
    expect(treeLabel).toBeVisible()

    const companyOrOrganization = screen.getByText(companyOrOrganizationName)
    expect(companyOrOrganization).toBeVisible()
  })

  it('Admin View - should render all action buttons', async () => {
    render(<Admin />)

    const accountAddButton = screen.getByTestId('item-add-mock-button')
    expect(accountAddButton).toBeVisible()
    fireEvent.click(accountAddButton)
    expect(onAddMock).toHaveBeenCalled()

    const accountEditButton = screen.getByTestId('item-edit-mock-button')
    expect(accountEditButton).toBeVisible()
    fireEvent.click(accountEditButton)
    expect(onEditMock).toHaveBeenCalled()

    const accountDIsableButton = screen.getByTestId('item-disable-mock-button')
    expect(accountDIsableButton).toBeVisible()
    fireEvent.click(accountDIsableButton)
    expect(onDisableMock).toHaveBeenCalled()

    const buyerButton = screen.getByTestId('buyer-mock-button')
    expect(buyerButton).toBeVisible()
    fireEvent.click(buyerButton)
    expect(onBuyerClickMock).toHaveBeenCalled()

    const quoteButton = screen.getByTestId('quote-mock-button')
    expect(quoteButton).toBeVisible()
    fireEvent.click(quoteButton)
    expect(onQuotesClickMock).toHaveBeenCalled()

    const listItemIcon = screen.getByRole('listitem')
    expect(listItemIcon).toBeVisible()
  })

  it('Purchaser View - should render only buyer and quotes buttons', async () => {
    render(<Purchaser />)

    const accountAddButton = screen.queryByRole('item-add-mock-button')
    expect(accountAddButton).not.toBeInTheDocument()

    const buyerButton = screen.getByTestId('buyer-mock-button')
    expect(buyerButton).toBeVisible()
  })

  it('Non Purchaser View - no actions should render', async () => {
    render(<NonPurchaser />)

    const accountAddButton = screen.queryByRole('item-add-mock-button')
    expect(accountAddButton).not.toBeInTheDocument()

    const quoteButton = screen.queryByText('quotes')
    expect(quoteButton).not.toBeInTheDocument()
  })
})
