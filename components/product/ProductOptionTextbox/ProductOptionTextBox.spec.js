import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file
import { options } from '@/__mocks__/productOptionTextBoxMock'

const { Default } = composeStories(stories)

const setup = () => {
  render(<Default {...Default.args} />)
}

describe('[component] ProductOptionTextBox component', () => {
  it('should render all the options', () => {
    setup()

    expect(screen.getAllByRole('textbox')).toHaveLength(options.length)
  })
})
