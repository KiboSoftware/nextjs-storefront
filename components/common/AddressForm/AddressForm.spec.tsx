import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './AddressForm.stories'

const { Common } = composeStories(stories)

describe('[components] - AddressForm', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    //arrange
    setup()

    // act
    const textBoxList = screen.getAllByRole('textbox')

    // assert
    expect(textBoxList).toHaveLength(8)
  })
})
