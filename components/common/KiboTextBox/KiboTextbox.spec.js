import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboTextbox.stories' // import all stories from the stories file

const { WithLabel, WithPlaceholder, WithError, WithErrorDescription } = composeStories(stories)

describe('[component] KiboTextbox component', () => {
  it('should render the component', () => {
    render(<WithLabel {...WithLabel.args} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    expect(input).toBeVisible()
  })

  it('should render the component with placeholder', () => {
    render(<WithPlaceholder {...WithPlaceholder.args} />)
    const input = screen.getByPlaceholderText(WithPlaceholder.args.placeholder)

    expect(input).toBeVisible()
  })

  it('should render the component with error when props error is true', () => {
    render(<WithError {...WithError.args} />)
    const input = screen.getByLabelText(WithError.args.label)

    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('should render the error helper text when props error is true and helperText is passed', () => {
    render(<WithErrorDescription {...WithErrorDescription.args} />)
    const helperText = screen.getByText(WithErrorDescription.args.helperText)

    expect(helperText).toBeVisible()
    expect(helperText).toHaveAttribute('aria-errormessage', WithErrorDescription.args.helperText)
  })

  it('should call onChange method when user input data', () => {
    const onChangeMock = jest.fn()
    render(<WithLabel {...WithLabel.args} onChange={onChangeMock} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    userEvent.type(input, 'Test')

    expect(onChangeMock).toHaveBeenCalledTimes(4)
  })

  it('should call handleChange method when user input data', () => {
    const handleChange = jest.fn()
    render(<WithLabel {...WithLabel.args} handleChange={handleChange} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    userEvent.type(input, 'Test')

    expect(onChangeMock).toHaveBeenCalled()
    expect(onChangeMock).toHaveBeenCalledWith('Test')
  })
})
