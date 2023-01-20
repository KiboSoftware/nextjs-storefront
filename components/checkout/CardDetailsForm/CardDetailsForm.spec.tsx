import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CardDetailsForm.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()
const onFormStatusChangeMock = jest.fn()

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} onFormStatusChange={onFormStatusChangeMock} />)

  return {
    user,
  }
}

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangeMock} onBlur={onBlurMock} />
)
jest.mock('../../common/KiboTextBox/KiboTextBox', () => () => KiboTextBoxMock())

describe('[components] CardDetailsForm', () => {
  it('should render component', () => {
    setup()

    const cardDetailsComponent = screen.getByTestId('card-details')
    const textBoxList = screen.getAllByTestId('text-box-mock')

    expect(cardDetailsComponent).toBeInTheDocument()
    expect(textBoxList).toHaveLength(3)
  })

  describe('should onBlur call on card component inputs', () => {
    it('Should call onBlur on cardNumber', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const cardNumber = textBoxList[0]
      cardNumber.focus()
      fireEvent.blur(cardNumber)

      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should call onBlur on cardNumber', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const expiryDate = textBoxList[1]
      expiryDate.focus()
      fireEvent.blur(expiryDate)

      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should call onBlur on Security Code(CVV)', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const securityCode = textBoxList[2]
      securityCode.focus()
      fireEvent.blur(securityCode)

      expect(onBlurMock).toHaveBeenCalled()
    })
  })
})
