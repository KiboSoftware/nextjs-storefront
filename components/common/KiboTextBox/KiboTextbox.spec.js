import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './KiboTextbox.stories' // import all stories from the stories file

const { WithLabel, WithoutLabel, WithError, WithErrorDescription } = composeStories(stories)

describe('[component] KiboTextbox component', () => {
  describe('with label component', () => {
    it('should render the component', () => {
      render(<WithLabel {...WithLabel.args} />)
      const input = screen.getByRole('textbox', {
        name: WithLabel.args.label,
      })

      expect(input).toBeVisible()
    })
  })

  describe('without label component', () => {
    it('should render the component', () => {
      render(<WithoutLabel {...WithoutLabel.args} />)
      const input = screen.getByRole('textbox')
      expect(input).toBeVisible()
    })
  })

  describe('with error component', () => {
    it('should render the component', () => {
      render(<WithError {...WithError.args} />)
      const input = screen.getByLabelText(WithError.args.label)

      expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
    })
  })

  describe('with error description component', () => {
    it('should render the component', () => {
      render(<WithErrorDescription {...WithErrorDescription.args} />)
      const input = screen.getByLabelText(WithErrorDescription.args.label)
      const helperText = screen.getByTestId('helper-text')

      expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
      expect(helperText).toBeVisible()
    })
  })

  it('should call handleChange method when user input data', () => {
    const handleChange = jest.fn()
    render(<WithLabel {...WithLabel.args} handleChange={handleChange} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    userEvent.type(input, 'Test')

    expect(handleChange).toHaveBeenCalled()
    expect(handleChange).toHaveBeenCalledWith('Test')
  })
})
