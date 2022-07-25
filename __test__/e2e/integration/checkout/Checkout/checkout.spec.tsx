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

  describe('Shipping Step', () => {
    it('should enable Payment Step when user clicks on Go To Payment button', async () => {
      const { user } = setup(1)

      const goToPamentButton = screen.getByRole('button', {
        name: /go-to-payment/i,
      })

      await user.click(goToPamentButton)

      const paymentStep = await screen.findByTestId('checkout-payment')

      expect(paymentStep).toBeVisible()
    })

    it('should enable Details Step when user clicks on Go Back button', async () => {
      const { user } = setup(1)

      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      const detailsStep = await screen.findByTestId('checkout-details')

      expect(detailsStep).toBeVisible()
    })

    it('should able to save Shipping Address when user clicks on Save Shipping Address button', async () => {
      const { user } = setup(1)

      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      const countryCode = screen.getByRole('button', {
        name: /DE/i,
      })

      const saveShippingAddressButton = screen.getByRole('button', {
        name: /save-shipping-address/i,
      })

      await user.type(firstName, 'John')
      await user.type(lastNameOrSurname, 'Doe')
      await user.type(address1, 'Baker Street')
      await user.type(address2, 'Near Lords')
      await user.type(cityOrTown, 'London')
      await user.type(stateOrProvince, 'East London')
      await user.type(postalOrZipCode, '411033')
      await user.type(phoneNumberHome, '9921215096')

      await user.click(countryCode)
      await user.click(saveShippingAddressButton)
      const rate = `${shippingRateMock.orderShipmentMethods[0].shippingMethodName} $${shippingRateMock.orderShipmentMethods[0].price}`

      const button = await screen.findByRole('button', { name: 'Select Shipping Option' })
      fireEvent.mouseDown(button)
      const options = within(screen.getByRole('listbox'))
      const option = options.getByText(rate)

      expect(option).toBeVisible()
    })
  })

  describe('Payment Step', () => {
    it('should enable Shipping Step when user clicks on Go Back button', async () => {
      const { user } = setup(2)

      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      const shippingStep = await screen.findByTestId('checkout-shipping')

      expect(shippingStep).toBeVisible()
    })
  })

  describe('Review Step', () => {
    it('should enable Pay and Confirm button in when user checks terms and conditions checkbox', async () => {
      const { user } = setup(3)

      const termsConditions = screen.getByRole('checkbox', {
        name: /termsconditions/i,
      })
      termsConditions.focus()

      await user.click(termsConditions)

      await waitFor(() => expect(termsConditions).toBeChecked())
    })

    it('should enable Payment Step when user clicks on Go Back button', async () => {
      const { user } = setup(3)

      const reviewComponent = screen.getByTestId(/review-step-component/i)
      const goBackButton = screen.getByRole('button', {
        name: /go-back/i,
      })

      await user.click(goBackButton)

      await waitFor(() => expect(reviewComponent).not.toBeVisible())
    })

    it('should go to details step when click on edit personal details', async () => {
      const { user } = setup(3)

      let personalDetailsStep = screen.queryByTestId('checkout-details')
      expect(personalDetailsStep).not.toBeInTheDocument()

      const editPersonalDetails = screen.getByTestId(/edit-personal-details/i)
      await user.click(editPersonalDetails)

      personalDetailsStep = screen.getByTestId(/checkout-details/i)
      await waitFor(() => expect(personalDetailsStep).toBeVisible())
    })

    it('should go to shipping step when click on edit shipping details', async () => {
      const { user } = setup(3)

      let shippingStep = screen.queryByTestId('checkout-shipping')
      expect(shippingStep).not.toBeInTheDocument()

      const editShippingDetails = screen.getByTestId(/edit-shipping-details/i)
      await user.click(editShippingDetails)

      shippingStep = screen.getByTestId(/checkout-shipping/i)
      await waitFor(() => expect(shippingStep).toBeVisible())
    })

    it('should go to payment step when click on edit billing address', async () => {
      const { user } = setup(3)

      let paymentStep = screen.queryByTestId('checkout-payment')
      expect(paymentStep).not.toBeInTheDocument()

      const editBillingDetails = screen.getByTestId(/edit-billing-address/i)
      await user.click(editBillingDetails)

      paymentStep = screen.getByTestId(/checkout-payment/i)
      await waitFor(() => expect(paymentStep).toBeVisible())
    })

    it('should go to payment step when click on edit payment method', async () => {
      const { user } = setup(3)

      let paymentStep = screen.queryByTestId('checkout-payment')
      expect(paymentStep).not.toBeInTheDocument()

      const editPaymentMethod = screen.getByTestId(/edit-payment-method/i)
      await user.click(editPaymentMethod)

      paymentStep = screen.getByTestId(/checkout-payment/i)
      await waitFor(() => expect(paymentStep).toBeVisible())
    })
  })
})
