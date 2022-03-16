import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductOptionCheckbox.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('[component] ProductOptionCheckbox component', () => {
  describe('Default component', () => {
    it('should render checkbox option', () => {
      const handleChangeMock = jest.fn()
      render(<Default {...Default.args} handleChange={handleChangeMock} />)
      const checkboxOptionLabel = screen.getByText(/is optional mount/i)

      expect(checkboxOptionLabel).toBeVisible()
    })

    it('should check/uncheck the checkbox', () => {
      const handleChangeMock = jest.fn()
      render(<Default {...Default.args} handleChange={handleChangeMock} />)
      const checkbox = screen.getByRole('checkbox')

      expect(checkbox).toBeChecked()

      userEvent.click(checkbox)

      expect(checkbox).not.toBeChecked()
    })
  })
})
