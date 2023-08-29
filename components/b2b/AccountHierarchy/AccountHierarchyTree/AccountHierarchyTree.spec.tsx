import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyTree.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'

const user = userEvent.setup()
const { Admin } = composeStories(stories)

const accounts = b2BAccountHierarchyResult.accounts
const hierarchy = b2BAccountHierarchyResult.hierarchy

const AccountHierarchyTreeLabelMock = () => (
  <div data-testid="account-hierarchy-tree-label-mock"></div>
)
jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyTreeLabel/AccountHierarchyTreeLabel',
  () => () => AccountHierarchyTreeLabelMock()
)

describe('AccountHierarchyTree', () => {
  it('should render the tree label for the admin role', async () => {
    render(<Admin accounts={accounts} hierarchy={[hierarchy]} role={B2BRoles.ADMIN} />)
    // Find the tree labels
    const treeLabels = screen.getAllByTestId('account-hierarchy-tree-label-mock')
    expect(treeLabels).toHaveLength(4)
  })

  it('should not render account actions buttons for non-admin roles', () => {
    render(<Admin accounts={accounts} hierarchy={[hierarchy]} role={B2BRoles.PURCHASER} />)

    // Find the account actions buttons (should not be rendered)
    const accountActionButtons = screen.queryAllByRole('button', { name: 'item-add' })

    accountActionButtons.forEach((button) => {
      expect(button).not.toBeInTheDocument()
    })
  })

  it('should collapse and expand all items when clicking the Collapse All and Expand All buttons', async () => {
    render(<Admin accounts={accounts} hierarchy={[hierarchy]} role={B2BRoles.ADMIN} />)

    // Find the Collapse All and Expand All buttons
    const expandAllButton = screen.getByText('expand-all')
    expect(expandAllButton).toBeVisible()

    const collapseAllButton = screen.getByText('collapse-all')
    expect(collapseAllButton).toBeVisible()

    await user.click(collapseAllButton)

    await waitFor(() => {
      expect(screen.getAllByTestId('account-hierarchy-tree-label-mock').length).toBe(1)
    })

    await user.click(expandAllButton)

    await waitFor(() => {
      expect(screen.getAllByTestId('account-hierarchy-tree-label-mock').length).toBe(
        b2BAccountHierarchyResult.accounts.length
      )
    })
  })
})
