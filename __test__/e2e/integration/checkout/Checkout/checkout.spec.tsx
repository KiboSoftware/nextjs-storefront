import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, fireEvent, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { orderMock, shippingRateMock } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/Checkout/Checkout.stories'
import { CheckoutStepProvider } from '@/context/CheckoutStepContext/CheckoutStepContext'

const { Common } = composeStories(stories)

jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { checkoutId: '13cbf88a39c9fb00010137fd0000678b' },
    }
  },
}))

const setup = (initialActiveStep = 0) => {
  const user = userEvent.setup()
  renderWithQueryClient(<Common {...Common.args} />)
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
      const initialActiveStep = 2
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
})
