import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

const onChangeMock = jest.fn()
const onBlurMock = jest.fn()

const KiboTextBoxMock = () => (
  <input
    data-testid="text-box-mock"
    onChange={(value) => onChangeMock(value)}
    onBlur={onBlurMock}
  />
)
jest.mock('../KiboTextBox/KiboTextBox', () => () => KiboTextBoxMock())

describe('[components] - AddressForm', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    //arrange
    setup()

    // act
    const textBoxList = screen.getAllByTestId('text-box-mock')

    // assert
    expect(textBoxList).toHaveLength(8)
  })

  it('should show user entered value', async () => {
    //arrange
    const { user } = setup()

    // act
    const textBoxList = screen.getAllByRole('textbox')

    await user.type(textBoxList[0], 'Shane')

    await waitFor(() => expect(textBoxList[0]).toHaveValue('Shane'))

    textBoxList[0].focus()

    fireEvent.blur(textBoxList[0])

    // assert
    await waitFor(() => expect(onBlurMock).toHaveBeenCalled())
  })
})
