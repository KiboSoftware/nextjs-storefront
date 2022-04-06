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

    expect(productOption).toBeVisible()
  })

  it('should render product option', () => {
    setup()

    const option = Common.args?.option
    const value = option?.value || ''
    const optionName = screen.getByText(value)

    expect(optionName).toBeVisible()
  })
})
