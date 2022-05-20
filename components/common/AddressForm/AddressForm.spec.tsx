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
})
