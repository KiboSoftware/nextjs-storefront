import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)
const mockedOnBlur = jest.fn()

const setup = () => {
  const user = userEvent.setup()
  render(<Common {...Common.args} onBlur={mockedOnBlur} />)
  return {
    user,
  }
}

describe('[component] ProductOptionTextBox component', () => {
  it('should render option', () => {
    setup()

    const textbox = screen.getByRole('textbox')

    expect(textbox).toBeInTheDocument()
  })

  it('should show user entered value', async () => {
    const { user } = setup()

    const textbox = screen.getByRole('textbox')

    user.type(textbox, 'Test')
    fireEvent.blur(textbox)

    await waitFor(() => {
      expect(textbox).toHaveValue('Test')
    })
    await waitFor(() => {
      expect(mockedOnBlur).toHaveBeenCalled()
    })
  })
})
