import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/Checkout/Checkout.stories'

const { Common } = composeStories(stories)

const setup = (initialStep: number) => {
  const user = userEvent.setup()
  renderWithQueryClient(<Common {...Common.args} initialStep={initialStep} />)
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

  it('should activate next step(shipping) when user enters valid input and clicks on "Go to Shipping" button', async () => {
    const { user } = setup(0)

    const email = 'Test@gmail.com'

    // Enter valid details
    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    await user.clear(emailInput)
    await user.type(emailInput, email)

    await waitFor(() => expect(emailInput).toHaveValue(email))
  })

  it('should call onCompleteCallback when user enters valid inputs', async () => {
    const onCompleteCallbackMock = jest.fn()

    const { user } = setup(2)

    const creditCard = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })

    await user.click(creditCard)

    const cardNumber = screen.getByRole('textbox', {
      name: /card-number/i,
    })

    const expiryDate = screen.getByPlaceholderText(/expiry-date-placeholder/i)

    const securityCode = screen.getByPlaceholderText(/security-code-placeholder/i)

    // act
    const firstName = screen.getByRole('textbox', { name: /first-name/i })

    // act
    const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name-or-sur-name/i })

    // act
    const address1 = screen.getByRole('textbox', { name: /address1/i })

    // act
    const address2 = screen.getByRole('textbox', { name: /address2/i })

    // act
    const cityOrTown = screen.getByRole('textbox', { name: /city/i })

    // act
    const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })

    // act
    const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })

    // act
    const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
    await user.type(cardNumber, '4111111111111111')
    await user.type(expiryDate, '03/2024')
    await user.type(securityCode, '123')
    await user.type(firstName, 'John')
    await user.type(lastNameOrSurname, 'Doe')
    await user.type(address1, '123 Main St')
    await user.type(address2, 'Apt 1')
    await user.type(cityOrTown, 'San Francisco')
    await user.type(stateOrProvince, 'CA')
    await user.type(postalOrZipCode, '94107')
    await user.type(phoneNumberHome, '1234567890')
    await onCompleteCallbackMock({ type: 'COMPLETE' })

    await waitFor(() => expect(onCompleteCallbackMock).toHaveBeenCalled())
  })

  it('should enable confirm and pay button in review step when terms and conditions checkbox checked ', async () => {
    const { user } = setup(3)

    const termsConditions = screen.getByRole('checkbox', {
      name: /termsconditions/i,
    })
    termsConditions.focus()

    await user.click(termsConditions)

    await waitFor(() => expect(termsConditions).toBeChecked())
  })

  it('should go to previous payment step when go back button click from review step', async () => {
    const { user } = setup(3)

    const reviewComponent = screen.getByTestId(/review-step-component/i)
    const goBackButton = screen.getByRole('button', {
      name: /go-back/i,
    })
    goBackButton.focus()

    await user.click(goBackButton)

    await waitFor(() => expect(reviewComponent).not.toBeInTheDocument())
  })

  it('should go to details step when click on edit personal details', async () => {
    const { user } = setup(3)

    let personalDetailsStep = screen.queryByTestId('checkout-details')

    expect(personalDetailsStep).not.toBeInTheDocument()

    const editPersonalDetails = screen.getByTestId(/edit-personal-details/i)
    editPersonalDetails.focus()

    await user.click(editPersonalDetails)

    personalDetailsStep = screen.getByTestId(/checkout-details/i)

    await waitFor(() => expect(personalDetailsStep).toBeInTheDocument())
  })

  it('should go to shipping step when click on edit shipping details', async () => {
    const { user } = setup(3)

    let shippingStep = screen.queryByTestId('checkout-shipping')

    expect(shippingStep).not.toBeInTheDocument()

    const editShippingDetails = screen.getByTestId(/edit-shipping-details/i)

    editShippingDetails.focus()

    await user.click(editShippingDetails)

    shippingStep = screen.getByTestId(/checkout-shipping/i)

    await waitFor(() => expect(shippingStep).toBeInTheDocument())
  })

  it('should go to payment step when click on edit billing address', async () => {
    const { user } = setup(3)

    let paymentStep = screen.queryByTestId('checkout-payment')

    expect(paymentStep).not.toBeInTheDocument()

    const editBillingDetails = screen.getByTestId(/edit-billing-address/i)

    editBillingDetails.focus()

    await user.click(editBillingDetails)

    paymentStep = screen.getByTestId(/checkout-payment/i)

    await waitFor(() => expect(paymentStep).toBeInTheDocument())
  })

  it('should go to payment step when click on edit payment method', async () => {
    const { user } = setup(3)

    let paymentStep = screen.queryByTestId('checkout-payment')

    expect(paymentStep).not.toBeInTheDocument()

    const editPaymentMethod = screen.getByTestId(/edit-payment-method/i)

    editPaymentMethod.focus()

    await user.click(editPaymentMethod)

    paymentStep = screen.getByTestId(/checkout-payment/i)

    await waitFor(() => expect(paymentStep).toBeInTheDocument())
  })
})
