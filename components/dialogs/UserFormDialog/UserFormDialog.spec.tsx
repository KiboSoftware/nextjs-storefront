import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './UserFormDialog.stories'

const { Common } = composeStories(stories)

const userFormMock = () => <div data-testid="user-form-mock" />
jest.mock('@/components/my-account/User/UserForm/UserForm', () => () => userFormMock())

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
})
