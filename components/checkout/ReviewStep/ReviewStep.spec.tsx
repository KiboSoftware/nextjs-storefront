import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { fireEvent, render, screen } from '@testing-library/react'

import * as stories from '../ReviewStep/ReviewStep.stories'
const { Common } = composeStories(stories)

const orderPriceMock = () => <div data-testid="order-price-component" />
jest.mock('@/components/common/OrderPrice/OrderPrice', () => orderPriceMock)

const onHandleAggreeTermsConditions = jest.fn()

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
    termsConditions.focus()
    fireEvent.change(termsConditions, {
      target: { onChange: onHandleAggreeTermsConditions() },
    })

    expect(onHandleAggreeTermsConditions).toBeCalled()
  })
})
