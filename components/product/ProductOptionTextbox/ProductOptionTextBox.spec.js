import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('[component] ProductOptionTextBox component', () => {
  describe('Default component', () => {
    const setup = () => {
      render(<Default {...Default.args} />)
      const firstOption = screen.getByRole('textbox', {
        name: /optional mount/i,
      })
      const secondOption = screen.getByRole('textbox', {
        name: /size/i,
      })

      return {
        firstOption,
        secondOption,
      }
    }

    it('should render optional mount and size textbox', () => {
      const { firstOption, secondOption } = setup()
      expect(firstOption).toBeVisible()
      expect(secondOption).toBeVisible()
    })

    it('should render all the options', () => {
      render(<Default {...Default.args} />)

      expect(screen.getAllByRole('textbox')).toHaveLength(Default.args.textBoxOptions.length)
    })
  })
})
