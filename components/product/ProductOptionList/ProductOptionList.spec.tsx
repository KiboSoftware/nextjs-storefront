import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './ProductOptionList.stories'

const { Common } = composeStories(stories)

const productOptionMock = () => <div data-testid="product-option-component" />
jest.mock('@/components/product/ProductOption/ProductOption', () => () => productOptionMock())

describe('[component] - ProductOptionList', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const productItemOptions = screen.getAllByTestId('product-option-component')
    const items = Common.args?.options || []

    const count = items.length || 0
    expect(productItemOptions).toHaveLength(count)
  })
})
