import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import { productOptionTextBoxMock } from '../../../__mocks__/productOptionTextBoxMock'
import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const setup = () => {
  render(<Common {...Common.args} />)
}

describe('[component] ProductOptionTextBox component', () => {
  it('should render all the options', () => {
    setup()

    expect(screen.getAllByRole('textbox')).toHaveLength(productOptionTextBoxMock.length)
  })
})
