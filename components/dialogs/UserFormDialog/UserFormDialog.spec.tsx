import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserFormDialog.stories'

const { Common } = composeStories(stories)

describe('[components]  UserFormDialog Dialog', () => {
  const setup = (params = {}) => {
    const user = userEvent.setup()
    render(<Common {...params} />)

    return { user }
  }

  it('should render component', async () => {
    setup({ ...Common.args })

    const userFormDialogComponent = screen.getByTestId('user-form')
    const dialogHeading = screen.getByRole('heading', { name: 'add-new-user' })

    expect(dialogHeading).toBeVisible()
    expect(userFormDialogComponent).toBeVisible()
  })

  it('should render form title passed in props', () => {
    render(<Common {...Common.args} formTitle="Add new user" />)

    const titleElement = screen.getByText('Add new user')
    expect(titleElement).toBeInTheDocument()
  })

  it('should render save and cancel text on button when isUserFormInDialog is true', () => {
    render(<Common {...Common.args} isUserFormInDialog={false} />)

    const cancelText = screen.getByText('cancel')
    expect(cancelText).toBeInTheDocument()

    const saveText = screen.getByText('save')
    expect(saveText).toBeInTheDocument()
  })
})
