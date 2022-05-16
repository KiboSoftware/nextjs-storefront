import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import * as stories from './CardDetailsForm.stories' // import all stories from the stories file
const { Common } = composeStories(stories)

const onChangMock = jest.fn()
const onBlurMock = jest.fn()

const KiboTextBoxMock = () => (
  <input data-testid="text-box-mock" onChange={onChangMock} onBlur={onBlurMock} />
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

  it('should valid Expiry Date', async () => {
    setup()

    const textBoxList = screen.getAllByRole('textbox')
    const expiryDate = textBoxList[1]
    expiryDate.focus()
    fireEvent.blur(expiryDate, { target: { value: '03/2023' } })

    await waitFor(() => {
      const monthYear = (expiryDate as HTMLInputElement).value.split('/')
      const month = parseInt(monthYear[0])
      const year = parseInt(monthYear[1])
      const currentDate = new Date()
      const someDay = new Date()
      someDay.setFullYear(year, month, 1)

      expect(someDay >= currentDate).toBeTruthy()
    })
  })

  it('should valid Security Code(CVV)', async () => {
    setup()

    const textBoxList = screen.getAllByRole('textbox')
    const securityCode = textBoxList[2]
    securityCode.focus()
    fireEvent.blur(securityCode, { target: { value: '123' } })

    expect((securityCode as HTMLInputElement).value).toHaveLength(3)
  })
})
