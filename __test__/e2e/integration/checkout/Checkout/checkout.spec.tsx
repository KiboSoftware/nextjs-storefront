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
  renderWithQueryClient(
    <CheckoutStepProvider
      steps={['details', 'shipping', 'payment', 'review']}
      initialActiveStep={initialActiveStep}
    >
      <Common {...Common.args} />
    </CheckoutStepProvider>
  )
  return {
    user,
  }
}

afterEach(() => {
  cleanup()
})

describe('[components] Checkout integration', () => {
  it('should render component', () => {
    setup(0)

    const kiboStepper = screen.getByTestId('kibo-stepper')
    const details = screen.getByTestId('checkout-details')
    const shipping = screen.queryByTestId('checkout-shipping')

    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })
    const backButton = screen.getByRole('button', { name: /back/i })

    expect(kiboStepper).toBeVisible()
    expect(details).toBeVisible()
    expect(shipping).not.toBeInTheDocument()

    expect(nextButton).toBeVisible()
    expect(backButton).toBeVisible()
    expect(backButton).toBeDisabled()
  })

  describe('Details Step', () => {
    it('should enable Shipping Step when clicks on Go To Shipping button', async () => {
      const { user } = setup(0)

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
