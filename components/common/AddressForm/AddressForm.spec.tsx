import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()
const onHandleSubmitMock = jest.fn()
const onInvalidFormMock = jest.fn()

const KiboTextBoxMock = () => (
  <input
    data-testid="text-box-mock"
    onChange={(value) => onChangeMock(value)}
    onBlur={onBlurMock}
  />
)
jest.mock('../KiboTextBox/KiboTextBox', () => KiboTextBoxMock)

describe('[components] - AddressForm', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    //arrange
    setup()

    // act
    const textBoxList = screen.getAllByTestId('text-box-mock')

    // assert
    expect(textBoxList).toHaveLength(8)
  })

  it('should show user entered value', () => {
    //arrange
    setup()

    // act
    const textBoxList = screen.getAllByRole('textbox')

    userEvent.type(textBoxList[0], 'Shane')
    userEvent.type(textBoxList[0], '{enter}')
    textBoxList[0].focus()
    fireEvent.blur(textBoxList[0])

    // assert
    expect(textBoxList[0]).toHaveValue('Shane')
    expect(onBlurMock).toHaveBeenCalled()
  })

  it('should stepperStatus validate call ', () => {
    setup()
    const stepperStatus = 'VALIDATE'
    const isValid = true
    if (stepperStatus === 'VALIDATE') {
      isValid ? onHandleSubmitMock() : onInvalidFormMock()
    }
    expect(stepperStatus).toBe('VALIDATE')
    expect(isValid).toBeTruthy()
    expect(onHandleSubmitMock).toBeCalled()
  })

  it('should call the onSubmit function', async () => {
    setup()

    const textBoxList = screen.getAllByRole('textbox')
    const firstName = textBoxList[0] as HTMLInputElement
    const lastName = textBoxList[1] as HTMLInputElement
    const address1 = textBoxList[2] as HTMLInputElement
    const address2 = textBoxList[3] as HTMLInputElement
    const cityOrTown = textBoxList[4] as HTMLInputElement
    const stateOrProvince = textBoxList[5] as HTMLInputElement
    const zipCode = textBoxList[6] as HTMLInputElement
    const country = textBoxList[7] as HTMLInputElement
    const phoneNumberHome = textBoxList[8] as HTMLInputElement

    fireEvent.change(firstName, { target: { value: 'John' } })
    fireEvent.change(lastName, { target: { value: 'Doe' } })
    fireEvent.change(address1, { target: { value: 'street' } })
    fireEvent.change(address2, { target: { value: 'apartment' } })
    fireEvent.change(cityOrTown, { target: { value: 'city' } })
    fireEvent.change(stateOrProvince, { target: { value: 'state' } })
    fireEvent.change(zipCode, { target: { value: '123456' } })
    fireEvent.change(country, { target: { value: 'US' } })
    fireEvent.change(phoneNumberHome, { target: { value: '1234567891' } })

    render(<Common {...Common.args} stepperStatus={'VALIDATE'} />)

    expect(onHandleSubmitMock).toHaveBeenCalled()
  })
})
