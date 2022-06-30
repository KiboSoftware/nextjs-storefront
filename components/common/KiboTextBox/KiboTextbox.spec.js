import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './KiboTextbox.stories' // import all stories from the stories file

const { WithLabel, WithPlaceholder, WithError, WithErrorDescription, WithIcon } =
  composeStories(stories)

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

  it('should render the error helper text when props error is true', () => {
    render(<WithErrorDescription {...WithErrorDescription.args} />)
    const helperText = screen.getByText(WithErrorDescription.args.helperText)

    expect(helperText).toBeVisible()
    expect(helperText).toHaveAttribute('aria-errormessage', WithErrorDescription.args.helperText)
  })

  it('should call onChange method when user input data', async () => {
    const onChangeMock = jest.fn()
    const user = userEvent.setup()
    render(<WithLabel {...WithLabel.args} onChange={onChangeMock} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    await user.type(input, 'Test')

    expect(onChangeMock).toHaveBeenCalledTimes(4)
  })

  it('should render endAdornment icon when icon is provided and should call onIconClick when icon is clicked', async () => {
    const onIconClickMock = jest.fn()
    const user = userEvent.setup()
    render(<WithIcon {...WithIcon.args} onIconClick={onIconClickMock} />)
    const icon = screen.getByRole('button')

    await user.click(icon)

    expect(icon).toBeVisible()
    expect(onIconClickMock).toHaveBeenCalled()
  })
})
