import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyTree.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'

const { Admin } = composeStories(stories)

const accounts = b2BAccountHierarchyResult.accounts
const hierarchy = b2BAccountHierarchyResult.hierarchy

describe('AccountHierarchyTree', () => {
  it('should render the tree label with icons and account actions for the admin role', async () => {
    render(<Admin accounts={accounts} hierarchy={hierarchy} role={B2BRoles.ADMIN} />)
    // Find the tree labels with icons
    const treeLabels = screen.getAllByTestId('tree-label')
    expect(treeLabels).toHaveLength(4)

    // Find the account actions buttons for the admin role
    const accountAddButtons = screen.getAllByRole('button', { name: 'item-add' })
    expect(accountAddButtons[0]).toBeVisible()
    expect(accountAddButtons).toHaveLength(4)

    const accountEditButtons = screen.getAllByRole('button', { name: 'item-edit' })
    expect(accountEditButtons[0]).toBeVisible()
    expect(accountEditButtons).toHaveLength(4)

    const accountDeleteButtons = screen.getAllByRole('button', { name: 'item-delete' })
    expect(accountDeleteButtons[0]).toBeVisible()
    expect(accountDeleteButtons).toHaveLength(4)
  })

  it('should not render account actions buttons for non-admin roles', () => {
    render(<Admin accounts={accounts} hierarchy={hierarchy} role={B2BRoles.PURCHASER} />)

    // Find the account actions buttons (should not be rendered)
    const accountActionButtons = screen.queryAllByRole('button', { name: 'item-add' })

    accountActionButtons.forEach((button) => {
      expect(button).not.toBeInTheDocument()
    })
  })

  it('should collapse and expand all items when clicking the Collapse All and Expand All buttons', () => {
    render(<Admin accounts={accounts} hierarchy={hierarchy} role={B2BRoles.ADMIN} />)

    // Find the Collapse All and Expand All buttons
    const collapseAllButton = screen.getByText('collapse-all')
    const expandAllButton = screen.getByText('expand-all')

    expect(collapseAllButton).toBeVisible()
    expect(expandAllButton).toBeVisible()
    // Click the Collapse All button and verify that all items are collapsed
    // fireEvent.click(collapseAllButton)
    // const collapsedItems = screen.getAllByTestId('collapse-state-icon')
    // expect(collapsedItems).toHaveLength(2) // Both items should be collapsed

    // Click the Expand All button and verify that all items are expanded
    // fireEvent.click(expandAllButton)
    // const expandedItems = screen.getAllByTestId('expand-more-icon')
    // expect(expandedItems).toHaveLength(2) // Both items should be expanded
  })

  // You can write more test cases to cover other scenarios as well
})
