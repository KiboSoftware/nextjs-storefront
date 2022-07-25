import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/cart/CartItem/CartItem.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItem Integration', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return {
      user,
    }
  }

  it('should render component', async () => {
    // arrange
    const { user } = setup()

    // act
    const img = screen.getByRole('img')
    const item = Common.args?.cartItem?.product
    const name = item?.name || ''
    const productName = screen.getByText(name)
    const fulfillmentOptions = screen.getByTestId('fulfillmentOptions')
    const increaseButton = screen.getByRole('button', { name: 'increase' })
    await user.click(increaseButton)
    const decreaseButton = screen.getByRole('button', { name: 'decrease' })
    await user.click(decreaseButton)
    const actionsIcon = screen.getByRole('button', { name: 'more' })
    await user.click(actionsIcon)

    // // assert
    expect(img).toBeInTheDocument()
    expect(fulfillmentOptions).toBeInTheDocument()
    expect(productName).toBeInTheDocument()
    expect(increaseButton).toBeEnabled()
    expect(decreaseButton).toBeEnabled()
    expect(actionsIcon).toBeEnabled()
  })

  it('should handle fulfillment option selection', async () => {
    const { user } = setup()

    const radio = screen.getByRole('radio', {
      name: /ship to home/i,
    })

    await user.click(radio)
    expect(radio).toBeChecked()
  })
})
