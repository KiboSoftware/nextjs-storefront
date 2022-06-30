import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'

import * as stories from './ProductOptionCheckbox.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

describe('[component] ProductOptionCheckbox component', () => {
  it('should render checkbox option', () => {
    render(<Common {...Common.args} />)

    const checkbox = screen.getByTestId('kibo-product-option-checkbox')

    expect(checkbox).toBeVisible()
  })

  it('should render checkbox label', () => {
    render(<Common {...Common.args} />)

    const checkbox = screen.getByText(/include warranty/i)

    expect(checkbox).toBeVisible()
  })
})
