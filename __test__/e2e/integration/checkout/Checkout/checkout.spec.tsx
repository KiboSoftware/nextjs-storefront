import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/Checkout/Checkout.stories'

const { Common } = composeStories(stories)

describe('[components] Checkout integration', () => {
  const setup = () => {
    renderWithQueryClient(<Common {...Common.args} />)
  }

  it('should render component', () => {
    setup()

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
    setup()

    const email = 'Test@gmail.com'

    // Enter valid details
    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    userEvent.clear(emailInput)
    userEvent.type(emailInput, email)

    expect(emailInput).toHaveValue(email)
  })

  it('should call onCompleteCallback when user enters valid inputs', async () => {
    const onCompleteCallbackMock = jest.fn()

    renderWithQueryClient(<Common {...Common.args} initialStep={2} />)

    const creditCard = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })

    userEvent.click(creditCard)

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
    userEvent.type(cardNumber, '4111111111111111')
    userEvent.type(expiryDate, '03/2024')
    userEvent.type(securityCode, '123')
    userEvent.type(firstName, 'John')
    userEvent.type(lastNameOrSurname, 'Doe')
    userEvent.type(address1, '123 Main St')
    userEvent.type(address2, 'Apt 1')
    userEvent.type(cityOrTown, 'San Francisco')
    userEvent.type(stateOrProvince, 'CA')
    userEvent.type(postalOrZipCode, '94107')
    userEvent.type(phoneNumberHome, '1234567890')
    onCompleteCallbackMock({ type: 'COMPLETE' })

    await waitFor(() => expect(onCompleteCallbackMock).toHaveBeenCalled())
  })

  it('should enable confirm and pay button in review step when terms and conditions checkbox checked ', async () => {
    renderWithQueryClient(<Common {...Common.args} initialStep={3} />)

    const termsConditions = screen.getByRole('checkbox', {
      name: /termsconditions/i,
    })
    termsConditions.focus()

    userEvent.click(termsConditions)

    expect(termsConditions).toBeChecked()
  })

  it('should go to previous payment step when go back button click from review step', async () => {
    renderWithQueryClient(<Common {...Common.args} initialStep={3} />)
    const reviewComponent = screen.getByTestId(/review-step-component/i)
    const goBackButton = screen.getByRole('button', {
      name: /go-back/i,
    })
    goBackButton.focus()

    userEvent.click(goBackButton)

    expect(reviewComponent).not.toBeInTheDocument()
  })
})
