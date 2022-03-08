import React from 'react'

import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { composeStories } from '@storybook/testing-react'

import * as stories from './ProductCard.stories' // import all stories from the stories file

const { Default, WithSalePrice, WithRating, NoImage, LoadingProductCard } = composeStories(stories)

describe('Product Card Component', () => {
  it('Renders Default Product Card', () => {
    render(<Default {...Default.args} />)
    const title = screen.getByText(Default.args.title)
    const price = screen.getByText(Default.args.price)
    const image = screen.getByTestId('product-image')
    const rating = screen.getByTestId('product-rating')
    const emptyRating = screen.getAllByTestId('empty-rating')

    expect(title).toBeVisible()
    expect(price).toBeVisible()
    expect(image).toHaveAttribute('alt', 'product-image-alt')
    expect(rating).toBeVisible()
    expect(emptyRating).toHaveLength(10)
  })

  it('Renders WithSalePrice Product Card', () => {
    render(<WithSalePrice {...WithSalePrice.args} />)
    const salePrice = screen.getByText(WithSalePrice.args.salePrice)
    expect(salePrice).toBeVisible()
  })

  it('Renders WithRating Product Card', () => {
    render(<WithRating {...WithRating.args} />)
    const filledRating = screen.getAllByTestId('filled-rating')

    expect(filledRating).toHaveLength(WithRating.args.rating * 2)
  })

  it('Renders No Image Product Card', () => {
    render(<NoImage {...NoImage.args} />)
    const image = screen.getByTestId('product-image')
    expect(image).toHaveAttribute('alt', 'no-image-alt')
  })

  it('Renders Product Card skeleton', () => {
    render(<LoadingProductCard {...LoadingProductCard.args} />)
    const skeleton = screen.getByTestId('product-card-skeleton')

    expect(skeleton).toBeVisible()
  })
})
