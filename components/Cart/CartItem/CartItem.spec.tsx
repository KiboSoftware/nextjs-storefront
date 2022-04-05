import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './CartItem.stories'

const { Common } = composeStories(stories)

describe('[components] - CartItem', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    // arrange
    setup()

    // act
    const img = screen.getByRole('img')
    const fulfillmentOptions = screen.getByTestId('fulfillmentOptions')

    // assert
    expect(img).toBeInTheDocument()
    expect(fulfillmentOptions).toBeInTheDocument()
  })

  it('should render product name', () => {
    setup()

    const item = Common.args?.cartItem?.product
    const name = item?.name || ''
    const productName = screen.getByText(name)

    expect(productName).toBeInTheDocument()
  })

  it('should render delete button', async () => {
    setup()

    const deleteButton = screen.getByRole('button', { name: 'item-delete' })

    expect(deleteButton).toBeEnabled()
  })
})
