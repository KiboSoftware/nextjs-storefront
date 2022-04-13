import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductOption.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductOption', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productOption = screen.getByTestId('productOption')
    const option = Common.args?.option
    const value = option?.value || ''
    const optionValue = screen.getByText(value)
    const name = option?.value || ''
    const optionName = screen.getByText(name)

    expect(productOption).toBeVisible()
    expect(optionValue).toBeVisible()
    expect(optionName).toBeVisible()
  })
})
