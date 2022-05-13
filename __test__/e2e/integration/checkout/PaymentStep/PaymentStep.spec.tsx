import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/checkout/PaymentStep/PaymentStep/PaymentStep.stories'

const { Common } = composeStories(stories)

describe('[components] PaymentStep', () => {
  const setup = () => render(<Common {...Common.args} />)
  const emptyInput = { target: { value: '' } }

  it('should render component', () => {
    setup()

    const paymentMethods = screen.getByTestId('payment-types')
    expect(paymentMethods).toBeVisible()

    const paymentMethod = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })
    expect(paymentMethod).toBeInTheDocument()

    const savePaymentMethod = screen.getByRole('checkbox', {
      name: /save-payment-method/i,
    })
    expect(savePaymentMethod).toBeInTheDocument()
    const copyShippingAddress = screen.getByRole('checkbox', {
      name: /copy-shipping-address/i,
    })
    expect(copyShippingAddress).toBeInTheDocument()
    const billingAddressHeading = screen.getByRole('heading', {
      name: /billing-address/i,
    })
    expect(billingAddressHeading).toBeInTheDocument()

    const saveBillingAddress = screen.getByRole('checkbox', {
      name: /save billing address/i,
    })
    expect(saveBillingAddress).toBeInTheDocument()
  })

  describe('should validate card component', () => {
    it('should validate selceted payment method ', () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)
      expect(creditCard).toBeChecked()
    })

    it('Should required cardNumber', async () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)
      const cardNumber = screen.getByRole('textbox', {
        name: /card-number/i,
      })
      // act
      await act(async () => {
        cardNumber.focus()
        fireEvent.blur(cardNumber, emptyInput)
      })
      const validationMessage = screen.getByText(/card-number-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required expiryDate', async () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)

      const expiryDate = screen.getByPlaceholderText(/expiry-date-placeholder/i)

      await act(async () => {
        expiryDate.focus()
        fireEvent.blur(expiryDate, emptyInput)
      })

      const validationMessage = screen.getByText(/expiry-date-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required Security Code(CVV)', async () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)

      const securityCode = screen.getByPlaceholderText(/security-code-placeholder/i)
      // act
      await act(async () => {
        securityCode.focus()
        fireEvent.blur(securityCode, emptyInput)
      })

      const validationMessage = screen.getByText(/security-code-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })
  })

  describe('should display billing address validation message', () => {
    it('Should required firstName', async () => {
      // arrange
      setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        firstName.focus()
        fireEvent.blur(firstName, emptyInput)
      })

      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required lastNameOrSurname', async () => {
      // arrange
      setup()

      // act
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name/i })
      await act(async () => {
        lastNameOrSurname.focus()
        fireEvent.blur(lastNameOrSurname, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required address1', async () => {
      // arrange
      setup()

      // act
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      await act(async () => {
        address1.focus()
        fireEvent.blur(address1, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required address2', async () => {
      // arrange
      setup()

      // act
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      await act(async () => {
        address2.focus()
        fireEvent.blur(address2, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required cityOrTown', async () => {
      // arrange
      setup()

      // act
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      await act(async () => {
        cityOrTown.focus()
        fireEvent.blur(cityOrTown, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required stateOrProvince', async () => {
      // arrange
      setup()

      // act
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      await act(async () => {
        stateOrProvince.focus()
        fireEvent.blur(stateOrProvince, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required postalOrZipCode', async () => {
      // arrange
      setup()

      // act
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      await act(async () => {
        postalOrZipCode.focus()
        fireEvent.blur(postalOrZipCode, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Should required phoneNumbers.home', async () => {
      // arrange
      setup()

      // act
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      await act(async () => {
        phoneNumberHome.focus()
        fireEvent.blur(phoneNumberHome, emptyInput)
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })
  })
})
