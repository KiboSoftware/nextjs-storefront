import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './KiboSelect.stories' // import all stories from the stories file

const { WithCustomPlaceholder, WithError, WithErrorDescription } = composeStories(stories)

describe('[component] KiboSelect component', () => {
  describe('with custom placeholder', () => {
    it('should render the component', () => {
      render(<WithCustomPlaceholder {...WithCustomPlaceholder.args} />)
      const select = screen.getByText(WithCustomPlaceholder.args.placeholder)

      expect(select).toBeVisible()
    })
  })

  describe('with error descriptioon', () => {
    it('should render the component', () => {
      render(<WithErrorDescription {...WithErrorDescription.args} />)
      const helperText = screen.getByTestId('helper-text')

      expect(helperText).toBeVisible()
    })
  })
})
