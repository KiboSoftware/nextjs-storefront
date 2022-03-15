import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import theme from '../../../styles/theme'
import * as stories from './ProductOptionTextBox.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('[component] ProductOptionTextBox component', () => {
  describe('Default component', () => {
    it('should render the component', () => {
      render(<Default {...Default.args} />)
      const select1 = screen.getByLabelText('Optional Mount')
      const select2 = screen.getByLabelText('Size')

      expect(select1).toBeVisible()
      expect(select2).toBeVisible()
    })
  })
})
