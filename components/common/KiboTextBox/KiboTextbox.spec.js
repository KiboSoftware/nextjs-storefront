import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './KiboTextbox.stories' // import all stories from the stories file

const { WithLabel, Required, WithError, WithErrorDescription } = composeStories(stories)

describe('[component] KiboTextbox component', () => {
  it('should render the component', () => {
    render(<WithLabel {...WithLabel.args} />)
    const input = screen.getByRole('textbox', {
      name: WithLabel.args.label,
    })

    expect(input).toBeVisible()
  })

  it('should render the component with error when props error is true', () => {
    render(<WithError {...WithError.args} />)
    const input = screen.getByLabelText(WithError.args.label)

    expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
  })

  it('should render the error helper text when props error is true and helperText is passed', () => {
    render(<WithErrorDescription {...WithErrorDescription.args} />)
    const input = screen.getByLabelText(WithErrorDescription.args.label)
    const helperText = screen.getByTestId('helper-text')

    expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
    expect(helperText).toBeVisible()
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
})
