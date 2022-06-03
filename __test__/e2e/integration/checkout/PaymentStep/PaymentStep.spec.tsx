import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, act, fireEvent } from '@testing-library/react'

import * as stories from '@/components/checkout/PaymentStep/PaymentStep.stories'
import { FormStates } from '@/lib/constants'
import userEvent from '@testing-library/user-event'

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
      name: /billing-address-same-as-shipping/i,
    })
    expect(copyShippingAddress).toBeInTheDocument()
    const billingAddressHeading = screen.getByRole('heading', {
      name: /billing-address/i,
    })
    expect(billingAddressHeading).toBeInTheDocument()

    const saveBillingAddress = screen.getByRole('checkbox', {
      name: /save-billing-address/i,
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

      const validationMessage = screen.getByText(/cvv-is-required/i)
      // assert
      expect(validationMessage).toBeVisible()
    })
  })

  it('should save payment not to be visible if user not logged in', () => {
    render(<Common {...Common.args} isUserLoggedIn={false} />)

    const savePaymentMethod = screen.queryByTestId('save-payment')

    expect(savePaymentMethod).not.toBeInTheDocument()
  })

  it('Should call onCompleteCallback when user enters review step button', async () => {
    const onCompleteCallbackMock = jest.fn()

    render(
      <Common
        {...Common.args}
        onCompleteCallback={onCompleteCallbackMock}
        stepperStatus={FormStates.VALIDATE}
      />
    )

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

    const firstName = screen.getByRole('textbox', { name: /first-name/i })

    await act(async () => {
      userEvent.type(cardNumber, '4111111111111111')
      userEvent.type(expiryDate, '03/2024')
      userEvent.type(securityCode, '123')
      userEvent.type(firstName, 'John')
    })

    expect(onCompleteCallbackMock).toBeCalled()
  })
})
