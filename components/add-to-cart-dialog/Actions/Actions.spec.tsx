import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Actions.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onAddToCartMock = jest.fn()
const onContinueShoppingMock = jest.fn()

describe('[components] Add To Cart Dialog', () => {
  const setup = () =>
    render(<Common onAddToCart={onAddToCartMock} onContinueShopping={onContinueShoppingMock} />)

  it('should render component', async () => {
    setup()

    const component = screen.getByTestId('actions-component')
    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    expect(component).toBeInTheDocument()
    expect(goToCartButton).toBeVisible()
    expect(continueShoppingButton).toBeVisible()
  })

  it('should call onAddToCart handler when user clicks on "Add To Cart" button', () => {
    setup()

    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    userEvent.click(goToCartButton)

    expect(goToCartButton).toBeVisible()
    expect(onAddToCartMock).toHaveBeenCalled()
  })

  it('should call onContinueShopping habdler when user clicks on "Continue Shopping" button', () => {
    setup()

    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })
    userEvent.click(continueShoppingButton)

    expect(continueShoppingButton).toBeVisible()
    expect(onContinueShoppingMock).toHaveBeenCalled()
  })
})
