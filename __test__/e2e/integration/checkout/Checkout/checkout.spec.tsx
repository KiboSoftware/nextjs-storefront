import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, act, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '../../../../../components/page-templates/Checkout/Checkout.stories'
import { renderWithQueryClient } from '../../../../utils/renderWithQueryClient'

const { Common } = composeStories(stories)

jest.mock('../../../../../hooks', () => ({
  useCheckout: jest.fn(() => ({})),
  useUpdateCheckout: () => ({
    mutateAsync: () => Promise.resolve(true),
    isLoading: false,
    isSuccess: true,
  }),
}))

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

    // Verify that detailsStep are visible and shippingStep are not visible
    let detailsStep: HTMLElement | null = screen.getByTestId('checkout-details')
    let shippingStep = screen.queryByTestId('checkout-shipping')

    expect(detailsStep).toBeVisible()
    expect(shippingStep).not.toBeInTheDocument()

    // Enter valid details
    const emailInput = screen.getByRole('textbox', { name: /your-email/i })

    await act(async () => {
      userEvent.clear(emailInput)
      userEvent.type(emailInput, email)
    })

    expect(emailInput).toHaveValue(email)

    // Click on "Go to Shipping" button
    const nextButton = screen.getByRole('button', { name: /go-to-shipping/i })
    await act(async () => {
      userEvent.click(nextButton)
    })

    // Verify that detailsStep are not visible and shippingStep are visible
    detailsStep = screen.queryByTestId('checkout-details')
    shippingStep = screen.getByTestId('checkout-shipping')

    expect(detailsStep).not.toBeInTheDocument()
    expect(shippingStep).toBeVisible()
  })

  it('should enable review order button when user enters valid inputs', async () => {
    const onCompleteCallbackMock = jest.fn()
    renderWithQueryClient(<Common {...Common.args} initialStep={2} />)

    const creditCard = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })

    await act(async () => {
      fireEvent.click(creditCard)
    })

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
    const reviewOrder = screen.getByRole('button', { name: /review-order/i })

    await act(async () => {
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
      userEvent.click(reviewOrder)
    })

    onCompleteCallbackMock({ type: 'COMPLETE' })

    await act(async () => {
      userEvent.click(reviewOrder)
    })

    expect(reviewOrder).toBeInTheDocument()
  })
})
