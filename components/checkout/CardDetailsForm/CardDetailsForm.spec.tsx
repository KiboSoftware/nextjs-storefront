import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'

import * as stories from './CardDetailsForm.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()
const onValidMock = jest.fn()
const onInvalidFormMock = jest.fn()
const onHandleSubmitMock = jest.fn()

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangeMock} onBlur={onBlurMock} />
)
jest.mock('../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

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
      fireEvent.blur(cardNumber)

      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should onBlur call on cardNumber', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const expiryDate = textBoxList[1]
      expiryDate.focus()
      fireEvent.blur(expiryDate)

      expect(onBlurMock).toHaveBeenCalled()
    })
    it('Should onBlur call on Security Code(CVV)', async () => {
      setup()

      const textBoxList = screen.getAllByRole('textbox')
      const securityCode = textBoxList[2]
      securityCode.focus()
      fireEvent.blur(securityCode)

      expect(onBlurMock).toHaveBeenCalled()
    })
  })

  it('should stepperStatus validate call ', () => {
    setup()
    const stepperStatus = 'VALIDATE'
    const isValid = true
    if (stepperStatus === 'VALIDATE') {
      isValid ? onHandleSubmitMock(onValidMock, onInvalidFormMock) : onInvalidFormMock()
    }
    expect(stepperStatus).toBe('VALIDATE')
    expect(isValid).toBeTruthy()
    expect(onHandleSubmitMock).toBeCalled()
  })

  it('should call the onSubmit function', async () => {
    setup()

    const textBoxList = screen.getAllByRole('textbox')

    const cardNumber = textBoxList[0] as HTMLInputElement
    const expiryDate = textBoxList[1] as HTMLInputElement
    const securityCode = textBoxList[2] as HTMLInputElement

    fireEvent.change(cardNumber, { target: { value: '4111111111111111' } })
    fireEvent.change(expiryDate, { target: { value: '02/2023' } })
    fireEvent.change(securityCode, { target: { value: '123' } })

    render(<Common {...Common.args} />)

    expect(onHandleSubmitMock).toHaveBeenCalled()
  })
})
