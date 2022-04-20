import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from '../../../../../components/cart/CartItemList/CartItemList.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItemList Integration', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const cartItem = screen.getAllByRole('group')

    // assert
    const count = Common.args?.cartItems?.length || 0
    expect(cartItem).toHaveLength(count)
  })
})
