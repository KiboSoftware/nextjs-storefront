import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MyProfile.stories'

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
jest.mock('../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[components] MyProfile', () => {
  const setup = (args = Common.args) => {
    const userAction = userEvent.setup()
    render(<Common {...args} />)
    return {
      userAction,
    }
  }

  it('should render component', () => {
    setup()

    const customerNameText = screen.getByText(/customer-name/i)
    const emailText = screen.getByText(/email/i)
    const passwordText = screen.getByText(/password/i)
    const EditName = screen.getAllByText(/edit/i)

    expect(customerNameText).toBeVisible()
    expect(emailText).toBeVisible()
    expect(passwordText).toBeVisible()
    expect(EditName[0]).toBeVisible()
  })
  it('should render edit', async () => {
    const { userAction } = setup()

    const EditName = screen.getAllByText(/edit/i)

    await userAction.click(EditName[0])
    const editCustomerName = screen.getByText(/customer-name/i)
    expect(editCustomerName).toBeVisible()

    const cancelName = screen.getByText(/cancel/i)
    await userAction.click(cancelName)

    const Editemail = screen.getAllByText(/edit/i)
    await userAction.click(Editemail[1])
    const editEmail = screen.getByText(/edit-email/i)
    expect(editEmail).toBeVisible()

    const cancelEmail = screen.getByText(/cancel/i)
    await userAction.click(cancelEmail)

    const Editpassword = screen.getAllByText(/edit/i)
    await userAction.click(Editpassword[3])
    const editPassword = screen.getByText(/edit-password/i)
    expect(editPassword).toBeVisible()
  })
})
