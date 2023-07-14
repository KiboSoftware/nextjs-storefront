import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserFormDialog.stories'

const { Common } = composeStories(stories)

const onSave = jest.fn()
const onClose = jest.fn()

const userFormMock = ({ onSave, onClose }: { onSave: () => void; onClose: () => void }) => (
  <div data-testid="user-form-mock">
    <button onClick={() => onClose()} data-testid="reset-mock-button">
      Reset
    </button>
    <button onClick={() => onSave()} data-testid="submit-mock-button">
      Submit
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

  it('should save on clicking submit button', async () => {
    setup({ ...Common.args, isUserFormInDialog: true })

    const submitButton = screen.getByTestId('submit-mock-button')
    userEvent.click(submitButton)
    await waitFor(() => expect(onSave).toHaveBeenCalled())
  })

  it('should close on clicking reset button', async () => {
    setup({ ...Common.args, isUserFormInDialog: true })

    const resetButton = screen.getByTestId('reset-mock-button')
    userEvent.click(resetButton)
    await waitFor(() => expect(onClose).toHaveBeenCalled())
  })
})
