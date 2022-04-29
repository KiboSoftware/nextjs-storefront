import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'

import { renderWithQueryClient } from '../../../test-utils'
import * as stories from './Checkout.stories'

const KiboStepperMock = ({ children }: { children: ReactNode }) => (
  <div data-testid="kibo-stepper-mock">{children}</div>
)
const DetailsMock = () => <div data-testid="details-mock" />
const ShippingMock = () => <div ref={undefined} data-testid="shipping-mock" />
const PaymentMock = () => <div ref={undefined} data-testid="payment-mock" />
const ReviewMock = () => <div ref={undefined} data-testid="review-mock" />

jest.mock('../KiboStepper/KiboStepper', () => KiboStepperMock)
jest.mock('../Details/Details', () => DetailsMock)
jest.mock('../Shipping/Shipping', () => ShippingMock)
jest.mock('../Payment/Payment', () => PaymentMock)
jest.mock('../Review/Review', () => ReviewMock)

const { Common } = composeStories(stories)

describe('[components] Checkout', () => {
  const setup = () => {
    renderWithQueryClient(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const kiboStepper = screen.getByTestId('kibo-stepper-mock')
    const details = screen.getByTestId('details-mock')
    const shipping = screen.getByTestId('shipping-mock')
    const payment = screen.getByTestId('payment-mock')
    const review = screen.getByTestId('review-mock')

    expect(kiboStepper).toBeVisible()
    expect(details).toBeVisible()
    expect(shipping).toBeVisible()
    expect(payment).toBeVisible()
    expect(review).toBeVisible()
  })
})
