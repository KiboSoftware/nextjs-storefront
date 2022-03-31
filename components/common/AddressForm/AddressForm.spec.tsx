import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

const KiboTextBoxMock = () => <div data-testid="text-box-mock" />
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
})
