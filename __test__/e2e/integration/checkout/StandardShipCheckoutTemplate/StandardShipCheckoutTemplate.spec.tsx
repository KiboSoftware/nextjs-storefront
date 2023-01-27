import React from 'react'

import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { orderCouponMock, orderMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import { StandardShipCheckoutTemplate } from '@/components/page-templates'
import { AuthContext, AuthContextType } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

jest.mock('@/lib/helpers/tokenizeCreditCardPayment', () => {
  return {
    tokenizeCreditCardPayment: jest.fn().mockImplementation(() => {
      return {
        id: 'hdah7d87ewbeed7wd8w8',
        numberPart: '************1111',
      }
    }),
  }
})

const setup = (initialActiveStep = 0, isAuthenticated = false) => {
  const user = userEvent.setup()

  const mockValues = mock<AuthContextType>()
  mockValues.isAuthenticated = isAuthenticated

  renderWithQueryClient(
    <AuthContext.Provider value={mockValues}>
      <CheckoutStepProvider
        steps={['details', 'shipping', 'payment', 'review']}
        initialActiveStep={initialActiveStep}
      >
        <StandardShipCheckoutTemplate checkout={orderMock.checkout} isMultiShipEnabled={false} />
      </CheckoutStepProvider>
    </AuthContext.Provider>
  )
  return {
    user,
  }
}

describe('[components] StandardShip Checkout integration', () => {
  describe('Displaying as active step', () => {
    it('should display Details Step as active step', () => {
      const initialActiveStep = 0
      setup(initialActiveStep)

      const kiboStepper = screen.getByTestId('kibo-stepper')
      const detailsStep = screen.getByTestId('checkout-details')
      const shippingStep = screen.queryByTestId('checkout-shipping')
      const paymentStep = screen.queryByTestId('checkout-payment')
      const reviewStep = screen.queryByTestId('checkout-review')

      const goToShippingButton = screen.getByRole('button', { name: /go-to-shipping/i })
      const backButton = screen.getByRole('button', { name: /back/i })

      expect(kiboStepper).toBeVisible()
      expect(detailsStep).toBeVisible()
      expect(shippingStep).not.toBeInTheDocument()
      expect(paymentStep).not.toBeInTheDocument()
      expect(reviewStep).not.toBeInTheDocument()

      expect(goToShippingButton).toBeVisible()
      expect(backButton).toBeVisible()
      expect(backButton).toBeDisabled()
    })
  })

  describe('StandardShip Details Step', () => {
    it('should enable Shipping Step when user clicks on "Go To Shipping" button', async () => {
      const initialActiveStep = 0
      const { user } = setup(initialActiveStep)

      const email = 'standardship@test.com'
      const emailInput = screen.getByRole('textbox', { name: /your-email/i })
      await user.clear(emailInput)
      await user.type(emailInput, email)

      await waitFor(async () => {
        const goToShippingButton = screen.getByRole('button', {
          name: /go-to-shipping/i,
        })

        await user.click(goToShippingButton)
        const shippingComponent = await screen.findByTestId('checkout-shipping')

        expect(shippingComponent).toBeVisible()
      })
    })
  })

  describe('StandardShip Shipping Step', () => {
    it('should enable Details Step when user clicks on Go Back button', async () => {
      const initialActiveStep = 1
      const { user } = setup(initialActiveStep)

      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      const detailsStep = await screen.findByTestId('checkout-details')

      expect(detailsStep).toBeVisible()
    })

    it('should apply a coupon when click apply button', async () => {
      server.use(
        graphql.query('getCheckout', (_req, res, ctx) => {
          return res(ctx.data({ checkout: orderCouponMock.updateOrderCoupon }))
        })
      )
      const initialActiveStep = 1
      const { user } = setup(initialActiveStep)
      const promoCode = '10OFF'
      const PromoCodeInput = screen.getByPlaceholderText('promo-code')

      const PromoCodeApply = screen.getByRole('button', {
        name: /apply/i,
      })

      await user.type(PromoCodeInput, promoCode)

      await user.click(PromoCodeApply)
      await waitFor(() => {
        const appliedPromoCode = screen.getByText(promoCode)
        expect(appliedPromoCode).toBeVisible()
      })
    })
  })
})
