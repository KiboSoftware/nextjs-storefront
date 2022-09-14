import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './MyProfile.stories'

const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
const ProfileDetailsFormMock = () => <div data-testid="profile-details-form-component" />
jest.mock('@/components/common/KiboTextBox/KiboTextBox.tsx', () => KiboTextBoxMock)
jest.mock(
  '@/components/my-account/ProfileDetailsForm/ProfileDetailsForm',
  () => ProfileDetailsFormMock
)

const setup = () => {
  const user = userEvent.setup()

  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[components] MyProfile', () => {
  it('should render component', () => {
    setup()

    const customerNameText = screen.getByText(/customer-name/i)
    const emailText = screen.getByText(/email/i)
    const passwordText = screen.getByText(/password/i)
    const editName = screen.getAllByText(/edit/i)

    expect(customerNameText).toBeVisible()
    expect(emailText).toBeVisible()
    expect(passwordText).toBeVisible()
    expect(editName[0]).toBeVisible()
  })

  it(`should render name form if 'edit' button is clicked`, async () => {
    const { user } = setup()

    const editName = screen.getAllByText(/edit/i)
    await user.click(editName[0])

    expect(screen.getByTestId('profile-details-form-component')).toBeVisible()
  })
})
