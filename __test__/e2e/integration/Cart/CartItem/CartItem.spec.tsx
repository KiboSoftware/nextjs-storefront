import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '@/components/Cart/CartItem/CartItem.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItem Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const img = screen.getByRole('img')
    const item = Common.args?.cartItem?.product
    const name = item?.name || ''
    const productName = screen.getByText(name)
    const fulfillmentOptions = screen.getByTestId('fulfillmentOptions')

    // // assert
    expect(img).toBeInTheDocument()
    expect(fulfillmentOptions).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
  })
})
