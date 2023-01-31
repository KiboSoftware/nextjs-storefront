import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import * as stories from './StandardShipCheckoutTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { orderMock } from '@/__mocks__/stories'

import { Checkout } from '@/lib/gql/types'

const { Common } = composeStories(stories)

jest.mock('../../checkout/CheckoutUITemplate/CheckoutUITemplate', () => ({
  __esModule: true,
  default: ({
    checkout,
    promoError,
    handleApplyCouponCode,
    handleRemoveCouponCode,
    children,
  }: {
    checkout: Checkout
    promoError: string
    handleApplyCouponCode: (couponCode: string) => void
    handleRemoveCouponCode: (couponCode: string) => void
    children: ReactNode
  }) => (
    <>
      <div data-testid="checkout-ui-template-mock">
        <p data-testid="promoError">{promoError}</p>
        <p data-testid="coupon-count">{checkout?.couponCodes?.length}</p>

        <button
          type="button"
          onClick={() => handleApplyCouponCode('100OFF')}
          data-testid="apply-coupon-button"
        >
          Apply Coupon
        </button>
        <button
          type="button"
          data-testid="remove-coupon-button"
          onClick={() => handleRemoveCouponCode('10OFF')}
        >
          Remove Coupon
        </button>
        {children}
      </div>
    </>
  ),
}))

jest.mock('../../checkout/DetailsStep/DetailsStep', () => ({
  __esModule: true,
  default: ({
    checkout,
    updateCheckoutPersonalInfo,
  }: {
    checkout: Checkout
    updateCheckoutPersonalInfo: (prop: { email: string }) => void
  }) => (
    <div data-testid="details-step-mock">
      <button
        type="button"
        data-testid="updateCheckoutPersonalInfo"
        onClick={() => updateCheckoutPersonalInfo({ email: 'test@gmail.com' })}
      >
        Update Checkout Personal Info
      </button>

      <p data-testid="updated-email">{checkout?.email}</p>
    </div>
  ),
}))

const StandardShippingStepMock = () => <div data-testid="standard-shipping-step-mock" />
jest.mock(
  '@/components/checkout/StandardShippingStep/StandardShippingStep',
  () => () => StandardShippingStepMock()
)

const PaymentStepMock = () => <div data-testid="payment-step-mock" />
jest.mock('@/components/checkout/PaymentStep/PaymentStep', () => () => PaymentStepMock())

const ReviewStepMock = () => <div data-testid="review-step-mock" />
jest.mock('@/components/checkout/ReviewStep/ReviewStep', () => () => ReviewStepMock())

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { checkoutId: '12345' },
  }),
}))

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('[component] - StandardShipCheckout template', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const checkoutUITemplate = screen.getByTestId('checkout-ui-template-mock')
    const detailsStep = screen.getByTestId('details-step-mock')
    const standardShippingStep = screen.getByTestId('standard-shipping-step-mock')
    const paymentStep = screen.getByTestId('payment-step-mock')
    const reviewStep = screen.getByTestId('review-step-mock')

    expect(checkoutUITemplate).toBeVisible()
    expect(detailsStep).toBeVisible()
    expect(standardShippingStep).toBeVisible()
    expect(paymentStep).toBeVisible()
    expect(reviewStep).toBeVisible()
  })

  it('should handle handleApplyCouponCode with invalid coupons', async () => {
    const user = userEvent.setup()
    server.use(
      graphql.mutation('updateOrderCoupon', (_req, res, ctx) => {
        return res(
          ctx.data({
            updateOrderCoupon: {
              invalidCoupons: [
                {
                  reason: 'Not a valid coupon',
                },
              ],
            },
          })
        )
      })
    )
    render(<Common {...Common?.args} />)
    await user.click(screen.getByTestId(/apply-coupon-button/))

    expect(screen.getByTestId('promoError')).toHaveTextContent('Not a valid coupon')
  })

  it('should handle handleRemoveCouponCode', async () => {
    const user = userEvent.setup()
    render(<Common {...Common?.args} />)
    expect(screen.getByTestId('coupon-count')).toHaveTextContent('2')
    server.use(
      graphql.query('getCheckout', (_req, res, ctx) => {
        return res(
          ctx.data({
            checkout: {
              ...orderMock.checkout,
              couponCodes: ['10OFF'],
            },
          })
        )
      })
    )
    await user.click(screen.getByTestId(/remove-coupon-button/))

    expect(screen.getByTestId('coupon-count')).toHaveTextContent('1')
  })

  it('should handle updateCheckoutPersonalInfo', async () => {
    const user = userEvent.setup()
    render(<Common {...Common?.args} />)

    server.use(
      graphql.query('getCheckout', (_req, res, ctx) => {
        return res(
          ctx.data({
            checkout: {
              ...orderMock.checkout,
              email: 'john.doe@gmail.com',
            },
          })
        )
      })
    )
    await user.click(screen.getByTestId(/updateCheckoutPersonalInfo/))

    expect(screen.getByTestId('updated-email')).toHaveTextContent('john.doe@gmail.com')
  })
})
