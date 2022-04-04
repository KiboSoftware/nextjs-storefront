import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

const KiboTextBoxMock = () => <input data-testid="text-box-mock" />
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
    const textBoxList = screen.getAllByTestId('text-box-mock')
    userEvent.type(textBoxList[0], 'Shane')

    // assert
    expect(textBoxList[0]).toHaveValue('Shane')
  })
})
