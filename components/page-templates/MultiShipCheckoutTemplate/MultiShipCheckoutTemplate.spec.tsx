import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Maybe } from 'graphql/jsutils/Maybe'
import { graphql } from 'msw'

import * as stories from './MultiShipCheckoutTemplate.stories'
import { server } from '@/__mocks__/msw/server'
import { checkoutMock } from '@/__mocks__/stories'

import { Checkout, CheckoutGrouping, CheckoutGroupRates } from '@/lib/gql/types'

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

jest.mock('../../checkout/MultiShippingStep/MultiShippingStep', () => ({
  __esModule: true,
  default: ({
    checkout,
    updateCheckoutShippingMethod,
  }: {
    checkout: Checkout
    updateCheckoutShippingMethod: (prop: {
      shippingMethodCode: string
      shippingMethodGroup: CheckoutGroupRates
    }) => void
  }) => (
    <div data-testid="multi-shipping-step-mock">
      <button
        type="button"
        data-testid="updateCheckoutShippingMethod"
        onClick={() =>
          updateCheckoutShippingMethod({
            shippingMethodCode: 'method2',
            shippingMethodGroup: {
              groupingId: 'group1',
              shippingRates: [
                {
                  shippingMethodCode: 'method1',
                },
                {
                  shippingMethodCode: 'method2',
                },
              ],
            },
          })
        }
      >
        Update Checkout Shipping Method
      </button>

      <p data-testid="updated-shipping-method">
        {checkout?.groupings?.find((each) => each?.id === 'group1')?.shippingMethodName || 'null'}
      </p>
    </div>
  ),
}))

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

describe('[component] - MultiShipCheckout template', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const checkoutUITemplate = screen.getByTestId('checkout-ui-template-mock')
    const detailsStep = screen.getByTestId('details-step-mock')
    const multiShippingStep = screen.getByTestId('multi-shipping-step-mock')
    const paymentStep = screen.getByTestId('payment-step-mock')
    const reviewStep = screen.getByTestId('review-step-mock')

    expect(checkoutUITemplate).toBeVisible()
    expect(detailsStep).toBeVisible()
    expect(multiShippingStep).toBeVisible()
    expect(paymentStep).toBeVisible()
    expect(reviewStep).toBeVisible()
  })

  it('should handle handleApplyCouponCode with invalid coupons', async () => {
    const user = userEvent.setup()

    server.use(
      graphql.mutation('updateCheckoutCoupon', (_req, res, ctx) => {
        return res(
          ctx.data({
            updateCheckoutCoupon: {
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

  it('should handle handleRemoveCouponCode function successfully', async () => {
    const user = userEvent.setup()
    render(<Common {...Common?.args} />)

    expect(screen.getByTestId('coupon-count')).toHaveTextContent('1')

    server.use(
      graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
        return res(
          ctx.data({
            checkout: {
              ...checkoutMock.checkout,
              couponCodes: [],
            },
          })
        )
      })
    )

    await user.click(screen.getByTestId(/remove-coupon-button/))

    expect(screen.getByTestId('coupon-count')).toHaveTextContent('0')
  })

  it('should handle updateCheckoutPersonalInfo', async () => {
    const user = userEvent.setup()

    render(<Common {...Common?.args} />)

    server.use(
      graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
        return res(
          ctx.data({
            checkout: {
              ...checkoutMock.checkout,
              email: 'john.doe@gmail.com',
            },
          })
        )
      })
    )

    await user.click(screen.getByTestId(/updateCheckoutPersonalInfo/))

    expect(screen.getByTestId('updated-email')).toHaveTextContent('john.doe@gmail.com')
  })

  it('should handle updateCheckoutShippingMethod', async () => {
    const user = userEvent.setup()

    render(<Common {...Common?.args} />)

    expect(screen.getByTestId('updated-shipping-method')).toHaveTextContent('null')

    server.use(
      graphql.query('getMultiShipCheckout', (_req, res, ctx) => {
        return res(
          ctx.data({
            checkout: {
              ...checkoutMock.checkout,
              groupings: [
                ...(checkoutMock.checkout.groupings as Maybe<Maybe<CheckoutGrouping>>[]),
                {
                  id: 'group1',
                  shippingMethodName: 'method2',
                },
              ],
            },
          })
        )
      })
    )

    await user.click(screen.getByTestId(/updateCheckoutShippingMethod/))

    expect(screen.getByTestId('updated-shipping-method')).toHaveTextContent('method2')
  })
})
