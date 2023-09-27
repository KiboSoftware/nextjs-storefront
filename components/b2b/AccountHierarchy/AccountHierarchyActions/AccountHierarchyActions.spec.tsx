import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyActions.stories'
import { renderWithQueryClient } from '@/__test__/utils'

const user = userEvent.setup()

const { Common } = composeStories(stories)

const onBuyersClickMock = jest.fn()
const onQuotesClickMock = jest.fn()
const onAddMock = jest.fn()
const onEditMock = jest.fn()
const onViewMock = jest.fn()
jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))

describe('[components] AccountHierarchyActions', () => {
  it('should render component', async () => {
    render(
      <Common
        onBuyersClick={onBuyersClickMock}
        onQuotesClick={onQuotesClickMock}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onView={onViewMock}
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

    const buyerButton = screen.getByText('buyers')
    await user.click(buyerButton)
    expect(onBuyersClickMock).toHaveBeenCalled()

    const quoteButton = screen.getByText('quotes')
    await user.click(quoteButton)
    expect(onQuotesClickMock).toHaveBeenCalled()
  })

  it('should render AccountHierarchyActions on mobile screen and handle callbacks', async () => {
    render(
      <Common
        mdScreen={false}
        onBuyersClick={onBuyersClickMock}
        onQuotesClick={onQuotesClickMock}
        onAdd={onAddMock}
        onEdit={onEditMock}
        onView={onViewMock}
      />
    )

    const moreIcon = screen.getByLabelText('more')
    expect(moreIcon).toBeVisible()

    await user.click(moreIcon)

    const accountViewButton = screen.getByRole('menuitem', { name: 'View account' })
    await user.click(accountViewButton)
    expect(onViewMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const accountEditButton = screen.getByRole('menuitem', { name: 'Edit account' })
    await user.click(accountEditButton)
    expect(onEditMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const buyerButton = screen.getByRole('menuitem', { name: 'View buyers for this account' })
    await user.click(buyerButton)
    expect(onBuyersClickMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const quoteButton = screen.getByRole('menuitem', { name: 'View quotes for this account' })
    await user.click(quoteButton)
    expect(onQuotesClickMock).toHaveBeenCalled()

    await user.click(moreIcon)

    const addChildAccountButton = screen.getByRole('menuitem', { name: 'Add a child account' })
    await user.click(addChildAccountButton)
    expect(onAddMock).toHaveBeenCalled()
  })

  it("should render Add, Edit, Buyers and Quotes buttons when role is 'Admin'", async () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    renderWithQueryClient(<Common mdScreen={true} />)

    const accountAddButton = screen.getByRole('button', { name: 'item-add' })
    expect(accountAddButton).toBeVisible()

    const accountEditButton = screen.getByRole('button', { name: 'item-edit' })
    expect(accountEditButton).toBeVisible()

    const buyerButton = screen.getByText('buyers')
    expect(buyerButton).toBeVisible()

    const quoteButton = screen.getByText('quotes')
    expect(quoteButton).toBeVisible()
  })

  it("should render Buyer and Quotes buttons when role is 'Purchaser'", async () => {
    // eslint-disable-next-line jsx-a11y/aria-role
    renderWithQueryClient(<Common mdScreen={true} />)

    const buyerButton = screen.getByText('buyers')
    expect(buyerButton).toBeVisible()

    const quoteButton = screen.getByText('quotes')
    expect(quoteButton).toBeVisible()
  })
})
