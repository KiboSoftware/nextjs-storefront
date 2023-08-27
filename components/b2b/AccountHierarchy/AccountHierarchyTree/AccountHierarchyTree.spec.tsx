import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyTree.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { B2BRoles } from '@/lib/constants'

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

  it('should collapse and expand all items when clicking the Collapse All and Expand All buttons', () => {
    render(<Admin accounts={accounts} hierarchy={[hierarchy]} role={B2BRoles.ADMIN} />)

    // Find the Collapse All and Expand All buttons
    const collapseAllButton = screen.getByText('collapse-all')
    expect(collapseAllButton).toBeVisible()

    const expandAllButton = screen.getByText('expand-all')
    expect(expandAllButton).toBeVisible()
  })
})
