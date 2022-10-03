import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'

import { renderWithQueryClient } from '../../../__test__/utils/renderWithQueryClient'
import * as stories from './Checkout.stories'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { checkoutId: '13cbf88a39c9fb00010137fd0000678b' },
    }
  },
}))
jest.mock('@/components/checkout/KiboStepper/KiboStepper', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="kibo-stepper-mock">{children}</div>
  ),
}))
jest.mock('@/components/checkout/DetailsStep/DetailsStep', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-details-mock" />,
}))
jest.mock('@/components/checkout/ShippingStep/ShippingStep', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-shipping-mock" />,
}))
jest.mock('@/components/checkout/PaymentStep/PaymentStep', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-payment-mock" />,
}))
jest.mock('@/components/checkout/ReviewStep/ReviewStep', () => ({
  __esModule: true,
  default: () => <div data-testid="checkout-review-mock" />,
}))

jest.mock('@/hooks', () => ({
  useCheckoutQueries: jest.fn(() => ({})),
  useUpdateCheckout: jest.fn(() => ({})),
  useCustomerContactsQueries: jest.fn(() => ({})),
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
