import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './KiboTextbox.stories' // import all stories from the stories file

const { WithLabel, WithError, WithErrorDescription } = composeStories(stories)

describe('[component] KiboTextbox component', () => {
  describe('with label', () => {
    it('should render the component', () => {
      render(<WithLabel {...WithLabel.args} />)
      const input = screen.getByLabelText(WithLabel.args.label)

      expect(input).toBeVisible()
    })
  })

  describe('with error', () => {
    it('should render the component', () => {
      render(<WithError {...WithError.args} />)
      const input = screen.getByLabelText(WithError.args.label)

      expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
    })
  })

  describe('with error descriptioon', () => {
    it('should render the component', () => {
      render(<WithErrorDescription {...WithErrorDescription.args} />)
      const input = screen.getByLabelText(WithErrorDescription.args.label)
      const helperText = screen.getByTestId('helper-text')

      expect(input).toHaveStyle(`border-color: ${theme.palette.error.main}`)
      expect(helperText).toBeVisible()
    })
  })
})
