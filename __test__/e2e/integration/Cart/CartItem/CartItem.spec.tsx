import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/cart/CartItem/CartItem.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItem Integration', () => {
  const setup = () => {
    const onQuantityUpdateMock = jest.fn()
    render(<Common {...Common.args} onQuantityUpdate={onQuantityUpdateMock} />)
    return {
      onQuantityUpdateMock,
    }
  }

  it('should render component', () => {
    // arrange
    const { onQuantityUpdateMock } = setup()

    // act
    const img = screen.getByRole('img')
    const item = Common.args?.cartItem?.product
    const name = item?.name || ''
    const productName = screen.getByText(name)
    const fulfillmentOptions = screen.getByTestId('fulfillmentOptions')
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    userEvent.click(increaseButton)
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    userEvent.click(decreaseButton)

    // // assert
    expect(img).toBeInTheDocument()
    expect(fulfillmentOptions).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
    expect(increaseButton).toBeEnabled()
    expect(decreaseButton).toBeEnabled()
    expect(onQuantityUpdateMock).toHaveBeenCalledTimes(2)
  })
})
