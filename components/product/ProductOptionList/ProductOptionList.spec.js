import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import * as stories from './ProductOptionList.stories' // import all stories from the stories file

const { Default } = composeStories(stories)

describe('[component] ProductOptionList component', () => {
  describe('Default component', () => {
    it('should render the component', () => {
      render(<Default {...Default.args} />)
      const selectFields = screen.getAllByText('Select product option')

      expect(selectFields).toHaveLength(2)
      selectFields.map((field) => {
        expect(field).toBeVisible()
      })
    })
  })
})
