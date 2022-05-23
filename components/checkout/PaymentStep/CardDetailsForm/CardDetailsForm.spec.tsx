import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './CardDetailsForm.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangeMock} onBlur={onBlurMock} />
)
jest.mock('../../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[components] CardDetailsForm', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()

    const cardDetailsComponent = screen.getByTestId('card-details')
    const textBoxList = screen.getAllByTestId('text-box-mock')

    expect(cardDetailsComponent).toBeInTheDocument()
    expect(textBoxList).toHaveLength(3)
  })

  describe('should onBlur call on card component inputs', () => {
    it('Should onBlur call on cardNumber', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const cardNumber = textBoxList[0]
      cardNumber.focus()
      fireEvent.change(cardNumber, { target: { value: '4111111111111111' } })
      fireEvent.blur(cardNumber)

      expect(onChangeMock).toHaveBeenCalled()
      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should onBlur call on cardNumber', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const expiryDate = textBoxList[1]
      expiryDate.focus()
      fireEvent.change(expiryDate, { target: { value: '03/2023' } })
      fireEvent.blur(expiryDate)

      expect(onChangeMock).toHaveBeenCalled()
      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should onBlur call on Security Code(CVV)', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const securityCode = textBoxList[2]
      securityCode.focus()
      fireEvent.change(securityCode, { target: { value: '123' } })
      fireEvent.blur(securityCode)

      expect(onChangeMock).toHaveBeenCalled()
      expect(onBlurMock).toHaveBeenCalled()
    })
  })
})
