import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

const onChangMock = jest.fn()

const KiboTextBoxMock = () => <input data-testid="text-box-mock" onChange={onChangMock} />
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

    // assert
    expect(textBoxList[0]).toHaveValue('Shane')
    expect(onChangMock).toHaveBeenCalled()
  })
})
