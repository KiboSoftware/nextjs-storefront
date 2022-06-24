import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../ReviewStep/ReviewStep.stories'
const { Common } = composeStories(stories)

const orderPriceMock = () => <div data-testid="order-price-component" />
jest.mock('@/components/common/OrderPrice/OrderPrice', () => orderPriceMock)
const productItemListMock = () => <div data-testid="product-item-stack" />
jest.mock('@/components/common/ProductItemList/ProductItemList', () => productItemListMock)

describe('[components] ReviewStep', () => {
  const setup = () => {
    render(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const reviewComponent = screen.getByTestId(/review-step-component/i)
    const orderDetailsHeading = screen.getByRole('heading', {
      name: /order-details/i,
    })
    const shippingToHomeHeading = screen.getByRole('heading', {
      name: /shipping-to-home/i,
    })
    const pickupInStoreHeading = screen.getByRole('heading', {
      name: /pickup-in-store/i,
    })
    const termsConditions = screen.getByRole('checkbox', {
      name: /termsconditions/i,
    })
    const confirmAndPayButton = screen.getByRole('button', {
      name: /confirm-and-pay/i,
    })
    const goBackButton = screen.getByRole('button', {
      name: /go-back/i,
    })

    expect(reviewComponent).toBeInTheDocument()
    expect(orderDetailsHeading).toBeVisible()
    expect(shippingToHomeHeading).toBeVisible()
    expect(pickupInStoreHeading).toBeVisible()
    expect(termsConditions).toBeInTheDocument()
    expect(confirmAndPayButton).toBeVisible()
    expect(goBackButton).toBeVisible()
  })

  it('should enable confirm and pay button when terms and conditions checkbox checked', () => {
    setup()

    const termsConditions = screen.getByRole('checkbox', {
      name: /termsconditions/i,
    })
    expect(termsConditions).not.toBeChecked()

    termsConditions.focus()
    userEvent.click(termsConditions)

    expect(termsConditions).toBeChecked()
  })
})
