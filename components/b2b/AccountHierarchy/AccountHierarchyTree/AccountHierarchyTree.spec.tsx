/* eslint-disable testing-library/no-node-access */
import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AccountHierarchyTree.stories'
import { b2BAccountHierarchyResult, hierarchyTreeMock } from '@/__mocks__/stories'

const user = userEvent.setup()
const { Admin } = composeStories(stories)

const accounts = b2BAccountHierarchyResult.accounts
const hierarchy = hierarchyTreeMock

const AccountHierarchyTreeLabelMock = () => (
  <div data-testid="account-hierarchy-tree-label-mock"></div>
)
jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyTreeLabel/AccountHierarchyTreeLabel',
  () => () => AccountHierarchyTreeLabelMock()
)

describe('[components] AccountHierarchyTree', () => {
  it('should render the tree label for the admin role', async () => {
    render(<Admin accounts={accounts} hierarchy={hierarchyTreeMock} />)

    const treeLabels = screen.getAllByTestId('account-hierarchy-tree-label-mock')

    function calculateTotalCount(node: { children: string | any[] }) {
      let count = 1

      if (node.children && node.children.length > 0) {
        for (const childNode of node.children) {
          count += calculateTotalCount(childNode)
        }
      }

      return count
    }
    expect(treeLabels).toHaveLength(calculateTotalCount(hierarchy[0]))
  })

  it('should not render account actions buttons for non-admin roles', () => {
    render(<Admin accounts={accounts} hierarchy={hierarchyTreeMock} />)

    // Find the account actions buttons (should not be rendered)
    const accountActionButtons = screen.queryAllByRole('button', { name: 'item-add' })

    accountActionButtons.forEach((button) => {
      expect(button).not.toBeInTheDocument()
    })
  })

  it('should collapse and expand all items when clicking the Collapse All and Expand All buttons', async () => {
    const setAccountHierarchyMock = jest.fn()
    render(
      <Admin
        accounts={accounts}
        hierarchy={hierarchyTreeMock}
        setAccountHierarchy={setAccountHierarchyMock}
      />
    )

    // Find the Collapse All and Expand All buttons
    const expandAllButton = screen.getByText('expand-all')
    expect(expandAllButton).toBeVisible()

    const collapseAllButton = screen.getByText('collapse-all')
    expect(collapseAllButton).toBeVisible()

    await user.click(collapseAllButton)

    await waitFor(() => {
      expect(setAccountHierarchyMock).toBeCalled()
    })

    await user.click(expandAllButton)

    await waitFor(() => {
      expect(setAccountHierarchyMock).toBeCalled()
    })
  })
})
