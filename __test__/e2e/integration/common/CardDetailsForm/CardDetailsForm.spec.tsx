import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/checkout/CardDetailsForm/CardDetailsForm.stories'
import { CheckoutStepProvider } from '@/context'

const { Common } = composeStories(stories)

let validateFormMock = false
const onFormStatusChangeMock = jest.fn().mockImplementation(() => (validateFormMock = true))
const onSaveCardDataMock = jest.fn().mockImplementation(() => {
  if (Common.args) {
    Common.args.validateForm = true
  }
})
const setValidateFormMock = jest.fn()

const setup = () => {
  const user = userEvent.setup()
  render(
    <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
      <Common
        validateForm={validateFormMock}
        onFormStatusChange={onFormStatusChangeMock}
        onSaveCardData={onSaveCardDataMock}
      />
    </CheckoutStepProvider>
  )

  return {
    user,
  }
}

describe('[components] - CardDetailsForm integration', () => {
  it('should call the onFormStatusChange if the form is valid', async () => {
    const { user } = setup()

    const textBoxList = screen.getAllByRole('textbox')
    const cardNumber = textBoxList[0]
    const expiryDate = textBoxList[1]
    const cvv = screen.getByPlaceholderText(/security-code-placeholder/i)

    // provide values
    await user.type(cardNumber, '4111111111111111')
    await user.type(expiryDate, '01/2026')
    await user.type(cvv, '123')
    await user.tab()

    expect(onFormStatusChangeMock).toHaveBeenLastCalledWith(true)
  })

  it('should call the onSaveCardData and setValidateForm if validateForm prop is true', async () => {
    const { user } = setup()

    const textBoxList = screen.getAllByRole('textbox')
    const cardNumber = textBoxList[0]
    const expiryDate = textBoxList[1]
    const cvv = screen.getByPlaceholderText(/security-code-placeholder/i)

    // provide values
    await user.type(cardNumber, '4111111111111111')
    await user.type(expiryDate, '01/2026')
    await user.type(cvv, '123')
    await user.tab()

    expect(onSaveCardDataMock).toHaveBeenCalled()
  })
})
