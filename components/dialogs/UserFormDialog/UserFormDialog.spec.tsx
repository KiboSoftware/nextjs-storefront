import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserFormDialog.stories'

const { Common } = composeStories(stories)

const onSave = jest.fn()
const onClose = jest.fn()

const userFormMock = ({ onSave, onClose }: { onSave: () => void; onClose: () => void }) => (
  <div data-testid="user-form-mock">
    <button onClick={() => onClose()} data-testid="cancel-mock-button">
      Cancel
    </button>
    <button onClick={() => onSave()} data-testid="save-mock-button">
      Save
    </button>
  </div>
)
jest.mock(
  '@/components/my-account/User/UserForm/UserForm',
  () => () => userFormMock({ onSave, onClose })
)

describe('[components]  UserFormDialog Dialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render component', async () => {
    setup({ ...Common.args, isUserFormInDialog: true })

    const closeIcon = screen.getByRole('button', { name: 'close' })
    const userFormDialogComponent = screen.getByTestId('user-form-mock')
    const dialogHeading = screen.getByRole('heading', { name: 'Add a new user' })

    expect(closeIcon).toBeVisible()
    expect(dialogHeading).toBeVisible()
    expect(userFormDialogComponent).toBeVisible()
  })

  it('should render with the correct form title', () => {
    const formTitle = 'Edit User'
    render(<Common {...Common.args} formTitle={formTitle} />)

    const titleElement = screen.getByText(formTitle)
    expect(titleElement).toBeInTheDocument()
  })

  it('should render save and cancel text on button when isUserFormInDialog is true', () => {
    render(<Common {...Common.args} isUserFormInDialog={false} />)

    const cancelText = screen.getByText('Cancel')
    expect(cancelText).toBeInTheDocument()

    const saveText = screen.getByText('Save')
    expect(saveText).toBeInTheDocument()
  })

  it('should save on clicking save button', async () => {
    setup({ ...Common.args, isUserFormInDialog: true })

    const saveButton = screen.getByTestId('save-mock-button')
    userEvent.click(saveButton)
    await waitFor(() => expect(onSave).toHaveBeenCalled())
  })

  it('should close on clicking cancel button', async () => {
    setup({ ...Common.args, isUserFormInDialog: true })

    const cancelButton = screen.getByTestId('cancel-mock-button')
    userEvent.click(cancelButton)
    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })
})
