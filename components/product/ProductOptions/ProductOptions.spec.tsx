import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductOptions.stories'

const { Common } = composeStories(stories)

describe('[component] - ProductOptions', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render product item options', () => {
    setup()

    const productItemOptions = screen.getAllByTestId('productOption')
    const items = Common.args?.options || []

    const count = items.length || 0
    expect(productItemOptions).toHaveLength(count)
  })
})
