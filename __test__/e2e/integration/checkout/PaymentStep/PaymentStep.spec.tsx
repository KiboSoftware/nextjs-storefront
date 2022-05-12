import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/checkout/PaymentStep/PaymentStep/PaymentStep.stories'

const { Common } = composeStories(stories)

describe('[components] PaymentStep', () => {
  const setup = () => render(<Common {...Common.args} />)

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

    it('Required cardNumber', async () => {
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
        fireEvent.blur(cardNumber, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/card-number-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Required expiryDate', async () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)

      const expiryDate = screen.getByPlaceholderText(/expiry-date-placeholder/i)

      await act(async () => {
        expiryDate.focus()
        fireEvent.blur(expiryDate, { target: { value: '' } })
      })

      const validationMessage = screen.getByText(/expiry-date-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })

    it('Required Security Code(CVV)', async () => {
      setup()

      const creditCard = screen.getByRole('radio', {
        name: /credit \/ debit card/i,
      })
      fireEvent.click(creditCard)

      const securityCode = screen.getByPlaceholderText(/security-code-placeholder/i)
      // act
      await act(async () => {
        securityCode.focus()
        fireEvent.blur(securityCode, { target: { value: '' } })
      })

      const validationMessage = screen.getByText(/security-code-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })
  })

  describe('should display billing address validation message', () => {
    it('firstName', async () => {
      // arrange
      setup()

      // act
      const firstName = screen.getByRole('textbox', { name: /first-name/i })
      await act(async () => {
        firstName.focus()
        fireEvent.blur(firstName, { target: { value: '' } })
      })

      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('lastNameOrSurname', async () => {
      // arrange
      setup()

      // act
      const lastNameOrSurname = screen.getByRole('textbox', { name: /last-name/i })
      await act(async () => {
        lastNameOrSurname.focus()
        fireEvent.blur(lastNameOrSurname, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('address1', async () => {
      // arrange
      setup()

      // act
      const address1 = screen.getByRole('textbox', { name: /address1/i })
      await act(async () => {
        address1.focus()
        fireEvent.blur(address1, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('address2', async () => {
      // arrange
      setup()

      // act
      const address2 = screen.getByRole('textbox', { name: /address2/i })
      await act(async () => {
        address2.focus()
        fireEvent.blur(address2, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('cityOrTown', async () => {
      // arrange
      setup()

      // act
      const cityOrTown = screen.getByRole('textbox', { name: /city/i })
      await act(async () => {
        cityOrTown.focus()
        fireEvent.blur(cityOrTown, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('stateOrProvince', async () => {
      // arrange
      setup()

      // act
      const stateOrProvince = screen.getByRole('textbox', { name: /state-or-province/i })
      await act(async () => {
        stateOrProvince.focus()
        fireEvent.blur(stateOrProvince, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('postalOrZipCode', async () => {
      // arrange
      setup()

      // act
      const postalOrZipCode = screen.getByRole('textbox', { name: /postal-or-zip-code/i })
      await act(async () => {
        postalOrZipCode.focus()
        fireEvent.blur(postalOrZipCode, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })

    it('phoneNumbers.home', async () => {
      // arrange
      setup()

      // act
      const phoneNumberHome = screen.getByRole('textbox', { name: /phone-number/i })
      await act(async () => {
        phoneNumberHome.focus()
        fireEvent.blur(phoneNumberHome, { target: { value: '' } })
      })
      const validationMessage = screen.getByText(/this field is required/i)

      // assert
      expect(validationMessage).toBeVisible()
    })
  })
})
