import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'

import { mockCheckout } from '../../../__mocks__/msw/mockData'
import { renderWithQueryClient } from '../../../__test__/utils/renderWithQueryClient'
import * as stories from './Checkout.stories'

const KiboStepperMock = ({ children }: { children: ReactNode }) => (
  <div data-testid="kibo-stepper-mock">{children}</div>
)

// Mock
const hooksMock = {
  useLoadCheckout: () => ({
    data: mockCheckout,
    isLoading: false,
    isSuccess: true,
  }),
  useLoadFromCart: () => ({
    data: mockCheckout,
    isLoading: false,
    isSuccess: true,
  }),
  useSetPersonalInfo: () => ({
    setPersonalInfoMutation: {
      mutate: jest.fn(),
      isLoading: false,
      isSuccess: true,
    },
  }),
}
const DetailsMock = () => <div data-testid="checkout-details-mock" />
const ShippingMock = () => <div ref={undefined} data-testid="checkout-shipping-mock" />
const PaymentMock = () => <div ref={undefined} data-testid="checkout-payment-mock" />
const ReviewMock = () => <div ref={undefined} data-testid="checkout-review-mock" />

jest.mock('../../../hooks', () => hooksMock)
jest.mock('../../checkout/KiboStepper/KiboStepper', () => KiboStepperMock)
jest.mock('../../checkout/Details/Details', () => DetailsMock)
jest.mock('../../checkout/Shipping/Shipping', () => ShippingMock)
jest.mock('../../checkout/Payment/Payment', () => PaymentMock)
jest.mock('../../checkout/Review/Review', () => ReviewMock)

const { Common } = composeStories(stories)

describe('[components] Checkout', () => {
  const setup = () => {
    renderWithQueryClient(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

    const kiboStepper = screen.getByTestId('kibo-stepper-mock')
    const details = screen.getByTestId('checkout-details-mock')
    const shipping = screen.getByTestId('checkout-shipping-mock')
    const payment = screen.getByTestId('checkout-payment-mock')
    const review = screen.getByTestId('checkout-review-mock')

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })
    const backButton = screen.getByRole('button', { name: /back/i })

    expect(kiboStepper).toBeVisible()
    expect(details).toBeVisible()
    expect(shipping).toBeVisible()
    expect(payment).toBeVisible()
    expect(review).toBeVisible()

    expect(nextButton).toBeVisible()
    expect(backButton).toBeVisible()
    expect(backButton).toBeDisabled()
  })
})
