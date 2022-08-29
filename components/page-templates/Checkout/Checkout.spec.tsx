import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'

import { renderWithQueryClient } from '../../../__test__/utils/renderWithQueryClient'
import * as stories from './Checkout.stories'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const KiboStepperMock = ({ children }: { children: ReactNode }) => (
  <div data-testid="kibo-stepper-mock">{children}</div>
)
const DetailsStepMock = () => <div data-testid="checkout-details-mock" />
const ShippingStepMock = () => <div data-testid="checkout-shipping-mock" />
const PaymentStepMock = () => <div data-testid="checkout-payment-mock" />
const ReviewStepMock = () => <div data-testid="checkout-review-mock" />

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { checkoutId: '13cbf88a39c9fb00010137fd0000678b' },
    }
  },
}))
jest.mock('../../checkout/KiboStepper/KiboStepper', () => KiboStepperMock)
jest.mock('../../checkout/DetailsStep/DetailsStep', () => DetailsStepMock)
jest.mock('../../checkout/ShippingStep/ShippingStep', () => ShippingStepMock)
jest.mock('../../checkout/PaymentStep/PaymentStep', () => PaymentStepMock)
jest.mock('../../checkout/ReviewStep/ReviewStep', () => ReviewStepMock)

jest.mock('@/hooks', () => ({
  useCheckoutQueries: jest.fn(() => ({})),
  useUpdateCheckout: jest.fn(() => ({})),
  useCustomerContacts: jest.fn(() => ({})),
  useUpdateOrderCouponMutation: jest.fn(() => ({})),
  useDeleteOrderCouponMutation: jest.fn(() => ({})),
}))

const { Common } = composeStories(stories)

describe('[components] Checkout', () => {
  const setup = () => {
    renderWithQueryClient(
      <CheckoutStepProvider steps={['details', 'shipping', 'payment', 'review']}>
        <Common {...Common.args} />
      </CheckoutStepProvider>
    )
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
