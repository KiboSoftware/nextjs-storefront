import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './Actions.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onGoToCartMock = jest.fn()
const onContinueShoppingMock = jest.fn()

describe('[components] Add To Cart Dialog Actions', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common onGoToCart={onGoToCartMock} onContinueShopping={onContinueShoppingMock} />)
    return {
      user,
    }
  }

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

  it('should call onGoToCart handler when user clicks on "Go To Cart" button', async () => {
    const { user } = setup()

    const goToCartButton = screen.getByRole('button', {
      name: /go-to-cart/i,
    })
    await user.click(goToCartButton)

    expect(goToCartButton).toBeVisible()
    expect(onGoToCartMock).toHaveBeenCalled()
  })

  it('should call onContinueShopping habdler when user clicks on "Continue Shopping" button', async () => {
    const { user } = setup()

    const continueShoppingButton = screen.getByRole('button', {
      name: /continue-shopping/i,
    })

    await user.click(continueShoppingButton)

    expect(continueShoppingButton).toBeVisible()
    expect(onContinueShoppingMock).toHaveBeenCalled()
  })
})
