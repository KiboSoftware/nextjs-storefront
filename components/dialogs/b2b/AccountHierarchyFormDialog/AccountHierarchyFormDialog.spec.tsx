import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AccountHierarchyFormDialog.stories'
import { b2BAccountHierarchyResult } from '@/__mocks__/stories'
import { ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const onSaveMock = jest.fn()
const onCloseMock = jest.fn()

const AccountHierarchyFormMock = ({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: () => void
}) => (
  <div data-testid="account-hierarchy-form-mock">
    <button data-testid="create-account-hierarchy-mock-button" onClick={onSave}>
      Create Account
    </button>
    <button data-testid="cancel-account-hierarchy-mock-button" onClick={onClose}>
      Cancel
    </button>
  </div>
)

jest.mock(
  '@/components/b2b/AccountHierarchy/AccountHierarchyForm/AccountHierarchyForm',
  () => () => AccountHierarchyFormMock({ onClose: onCloseMock, onSave: onSaveMock })
)

describe('[components]  AccountHierarchyFormDialog Dialog', () => {
  const setup = () => {
    render(
      <Common
        {...Common.args}
        accounts={b2BAccountHierarchyResult.accounts}
        isAddingAccountToChild={false}
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
    render(<Common {...Common.args} formTitle="Add child account" />)

    const accountHierarchyFromDialog = screen.getByTestId('account-hierarchy-form-mock')
    expect(accountHierarchyFromDialog).toBeVisible()

    const titleElement = screen.getByText('Add child account')
    expect(titleElement).toBeVisible()

    const accountHierarchyForm = screen.getByTestId('account-hierarchy-form-mock')
    expect(accountHierarchyForm).toBeVisible()
  })

  it('should call callback function when user clicks on Create Account button', async () => {
    const { onSaveMock } = setup()

    const createAccountButton = screen.getByTestId('create-account-hierarchy-mock-button')
    expect(createAccountButton).toBeVisible()
    expect(createAccountButton).toBeEnabled()

    createAccountButton.click()
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
