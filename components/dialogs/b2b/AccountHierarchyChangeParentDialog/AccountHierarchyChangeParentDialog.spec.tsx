import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyChangeParentDialog.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const onSaveMock = jest.fn()
const onCloseMock = jest.fn()

const AccountHierarchyChangeParentMock = ({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: () => void
}) => (
  <div data-testid="account-hierarchy-edit-form-mock">
    <button data-testid="update-account-hierarchy-mock-button" onClick={onSave}>
      Update Account
    </button>
    <button data-testid="cancel-account-hierarchy-mock-button" onClick={onClose}>
      Cancel
    </button>
  </div>
)

jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyChangeParent/AccountHierarchyChangeParent',
  () => () => AccountHierarchyChangeParentMock({ onClose: onCloseMock, onSave: onSaveMock })
)

describe('[components]  AccountHierarchyChangeParentDialog Dialog', () => {
  const setup = () => {
    render(
      <Common
        {...Common.args}
        accounts={b2BAccountHierarchyResult.accounts}
        parentAccount={b2BAccountHierarchyResult?.accounts?.[1]}
        onSave={onSaveMock}
        onClose={onCloseMock}
      />,
      {
        wrapper: ModalContextProvider,
      }
    )

    return {
      onSaveMock,
      onCloseMock,
    }
  }

  it('should render component', async () => {
    render(<Common {...Common.args} formTitle="Edit child account" />)

    const accountHierarchyEditFromDialog = screen.getByTestId('account-hierarchy-edit-form-mock')
    expect(accountHierarchyEditFromDialog).toBeVisible()

    const titleElement = screen.getByText('Edit child account')
    expect(titleElement).toBeVisible()

    const accountHierarchyEditForm = screen.getByTestId('account-hierarchy-edit-form-mock')
    expect(accountHierarchyEditForm).toBeVisible()
  })

  it('should call callback function when user clicks on Update Account button', async () => {
    const { onSaveMock } = setup()

    const updateAccountButton = screen.getByTestId('update-account-hierarchy-mock-button')
    expect(updateAccountButton).toBeVisible()
    expect(updateAccountButton).toBeEnabled()

    updateAccountButton.click()
    expect(onSaveMock).toHaveBeenCalledTimes(1)
  })

  it('should close modal when user clicks on Cancel button', async () => {
    const { onCloseMock } = setup()

    const cancelButton = screen.getByTestId('cancel-account-hierarchy-mock-button')
    expect(cancelButton).toBeVisible()

    cancelButton.click()
    expect(onCloseMock).toHaveBeenCalledTimes(1)
  })
})
