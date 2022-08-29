import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'
import { graphql } from 'msw'

import { server } from '@/__mocks__/msw/server'
import { orderMock, orderCouponMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/Checkout/Checkout.stories'
import { AuthContext, AuthContextType } from '@/context/'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'
const { Common } = composeStories(stories)

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { checkoutId: '13cbf88a39c9fb00010137fd0000678b' },
    }
  },
}))

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
        <Common {...Common.args} />
      </CheckoutStepProvider>
    </AuthContext.Provider>
  )
  return {
    user,
  }
}

afterEach(() => {
  cleanup()
})

describe('[components] Checkout integration', () => {
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

  describe('Details Step', () => {
    it('should enable Shipping Step when user clicks on "Go To Shipping" button', async () => {
      const initialActiveStep = 0
      const { user } = setup(initialActiveStep)

      const email = orderMock.checkout.email as string
      const emailInput = screen.getByRole('textbox', { name: /your-email/i })

      await user.clear(emailInput)
      await user.type(emailInput, email)

      const goToShipiingButton = screen.getByRole('button', {
        name: /go-to-shipping/i,
      })

      await user.click(goToShipiingButton)
      const shippingComponent = await screen.findByTestId('checkout-shipping')

      expect(shippingComponent).toBeVisible()
    })
  })

  describe('Shipping Step', () => {
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
          return res.once(ctx.data({ checkout: orderCouponMock.updateOrderCoupon }))
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

      const appliedPromoCode = screen.getByText(promoCode)
      expect(appliedPromoCode).toBeVisible()
    })

    it('shoul remove a coupon when click cross icon', async () => {
      const initialActiveStep = 1
      const promoCode = '10OFF'
      const newCheckout = { ...orderCouponMock.updateOrderCoupon }
      newCheckout.couponCodes = []
      server.use(
        graphql.query('getCheckout', (_req, res, ctx) => {
          return res.once(ctx.data({ checkout: newCheckout }))
        })
      )

      const { user } = setup(initialActiveStep)
      const removeIcon = screen.getAllByLabelText('remove-promo-code')
      await user.click(removeIcon[0])
      await waitFor(() => {
        const removedPromoCode = screen.queryByText(promoCode)
        expect(removedPromoCode).not.toBeInTheDocument()
      })
    })

    it('should show error message when applied an invalid coupon', async () => {
      const newOrderCoupon = { ...orderCouponMock.updateOrderCoupon }
      newOrderCoupon.invalidCoupons = [
        {
          couponCode: '11OFF',
          reason: 'Invalid coupon code',
          createDate: '',
          discountId: 234,
          reasonCode: 43,
        },
      ]
      server.use(
        graphql.mutation('updateOrderCoupon', (_req, res, ctx) => {
          return res(ctx.data({ updateOrderCoupon: newOrderCoupon }))
        })
      )
      const { user } = setup()
      const promoCode = '11OFF'
      const PromoCodeInput = screen.getByPlaceholderText('promo-code')

      const PromoCodeApply = screen.getByRole('button', {
        name: /apply/i,
      })

      await user.type(PromoCodeInput, promoCode)

      await user.click(PromoCodeApply)

      await waitFor(() => {
        const errorMessage = screen.getByText('Invalid coupon code')
        expect(errorMessage).toBeVisible()
      })
    })
  })

  describe('Payment Step', () => {
    it('should enable Shipping Step when user clicks on Go Back button', async () => {
      const initialActiveStep = 2
      const { user } = setup(initialActiveStep)

      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      const shippingStep = await screen.findByTestId('checkout-shipping')

      expect(shippingStep).toBeVisible()
    })
  })

  describe('Review Step', () => {
    it('should show Order Confirmation component when user clicks on Confirm and Pay', async () => {
      const initialActiveStep = 3
      const isAuthenticated = false
      const { user } = setup(initialActiveStep, isAuthenticated)

      const termsConditions = screen.getByRole('checkbox', {
        name: /termsconditions/i,
      })
      termsConditions.focus()
      await user.click(termsConditions)

      const iWantToCreateAccount = screen.getByRole('checkbox', { name: /showaccountfields/i })
      expect(iWantToCreateAccount).toBeEnabled()

      await user.click(iWantToCreateAccount)
      const firstNameTexBox = screen.getByRole('textbox', { name: /first-name/i })
      const lastNameTexBox = screen.getByRole('textbox', { name: /last-name/i })
      const passwordTexBox = screen.getByPlaceholderText(/password/i)

      await user.clear(firstNameTexBox)
      await user.clear(lastNameTexBox)
      await user.clear(passwordTexBox)

      await user.type(firstNameTexBox, 'first name')
      await user.type(lastNameTexBox, 'last name')
      await user.type(passwordTexBox, 'Password@1')

      await user.tab()

      const confirmAndPayButton = screen.getByRole('button', {
        name: /confirm-and-pay/i,
      })
      expect(confirmAndPayButton).toBeEnabled()

      await user.click(confirmAndPayButton)

      await waitFor(() => {
        const orderConfirmation = screen.getByTestId('order-confirmation')
        expect(orderConfirmation).toBeInTheDocument()
      })
    })

    it('should enable Payment Step when user clicks on Go Back button', async () => {
      const initialActiveStep = 3
      const { user } = setup(initialActiveStep)

      const reviewComponent = screen.getByTestId(/review-step-component/i)
      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      await waitFor(() => expect(reviewComponent).not.toBeVisible())
    })

    it('should go to details step when click on edit personal details', async () => {
      const initialActiveStep = 3
      const { user } = setup(initialActiveStep)

      let personalDetailsStep = screen.queryByTestId('checkout-details')
      expect(personalDetailsStep).not.toBeInTheDocument()

      const editPersonalDetails = screen.getByTestId(/edit-personal-details/i)
      await user.click(editPersonalDetails)

      personalDetailsStep = screen.getByTestId(/checkout-details/i)
      await waitFor(() => expect(personalDetailsStep).toBeVisible())
    })

    it('should go to shipping step when click on edit shipping details', async () => {
      const initialActiveStep = 3
      const { user } = setup(initialActiveStep)

      let shippingStep = screen.queryByTestId('checkout-shipping')
      expect(shippingStep).not.toBeInTheDocument()

      const editShippingDetails = screen.getByTestId(/edit-shipping-details/i)
      await user.click(editShippingDetails)

      shippingStep = screen.getByTestId(/checkout-shipping/i)
      await waitFor(() => expect(shippingStep).toBeVisible())
    })

    it('should go to payment step when click on edit billing address', async () => {
      const initialActiveStep = 3
      const { user } = setup(initialActiveStep)

      let paymentStep = screen.queryByTestId('checkout-payment')
      expect(paymentStep).not.toBeInTheDocument()

      const editBillingDetails = screen.getByTestId(/edit-billing-address/i)
      await user.click(editBillingDetails)

      paymentStep = screen.getByTestId(/checkout-payment/i)
      await waitFor(() => expect(paymentStep).toBeVisible())
    })

    it('should go to payment step when click on edit payment method', async () => {
      const initialActiveStep = 3
      const { user } = setup(initialActiveStep)

      let paymentStep = screen.queryByTestId('checkout-payment')
      expect(paymentStep).not.toBeInTheDocument()

      const editPaymentMethod = screen.getByTestId(/edit-payment-method/i)
      await user.click(editPaymentMethod)

      paymentStep = screen.getByTestId(/checkout-payment/i)
      await waitFor(() => expect(paymentStep).toBeVisible())
    })
  })
})
