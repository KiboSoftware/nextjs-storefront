import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/common/ProductItem/ProductItem.stories'

const { Common, WithPriceLabel } = composeStories(stories)

describe('[component] - ProductItem Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const qty = screen.getByText(/Qty/)

    expect(qty).toBeVisible()
  })
})

describe('[component] - ProductItem with Price Label', () => {
  const setup = () => {
    render(<WithPriceLabel {...WithPriceLabel.args} />)
  }

  it('should render component with price label inside details', () => {
    setup()

    const priceSalePrice = screen.getAllByText(/currency/i)

    expect(priceSalePrice).toHaveLength(2)
  })
})
