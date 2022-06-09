import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'

import * as stories from '../PaymentStep/PaymentStep.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onBlurMock = jest.fn()
const onHandleSavePaymentMethodMock = jest.fn()
const onHandlePaymentMethod = jest.fn()

const AddressFormMock = () => <div />
const CardDetailsFormMock = () => <div data-testid="card-details" />
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onBlur={onBlurMock} />

jest.mock('../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)
jest.mock('../CardDetailsForm/CardDetailsForm', () => CardDetailsFormMock)
jest.mock('../../common/AddressForm/AddressForm', () => AddressFormMock)

describe('[components] PaymentStep', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()

    const paymentHeading = screen.getByRole('heading', {
      name: /payment-method/i,
    })
    const cardPaymentMethod = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })
    const savePaymentMethod = screen.getByRole('checkbox', {
      name: /save-payment-method/i,
    })
    const billingAddressHeading = screen.getByRole('heading', {
      name: /billing-address/i,
    })
    const billingAddressSameAsShipping = screen.getByRole('checkbox', {
      name: /billing-address-same-as-shipping/i,
    })

    expect(paymentHeading).toBeInTheDocument()
    expect(cardPaymentMethod).toBeInTheDocument()
    expect(savePaymentMethod).toBeInTheDocument()
    expect(billingAddressSameAsShipping).toBeInTheDocument()
    expect(billingAddressHeading).toBeInTheDocument()
  })

  it('should display card details when user selects Credit/Debit Card as payment', () => {
    setup()

    const cardPaymentType = screen.getByRole('radio', {
      name: /credit \/ debit card/i,
    })
    cardPaymentType.focus()
    fireEvent.change(cardPaymentType, {
      target: { onChange: onHandlePaymentMethod() },
    })

    expect(onHandlePaymentMethod).toBeCalled()
  })

  it('should default unchecked saved payment if logged in', () => {
    setup()

    const savePaymentMethod = screen.getByTestId('save-payment')
    savePaymentMethod.focus()
    fireEvent.change(savePaymentMethod, {
      target: { onChange: onHandleSavePaymentMethodMock() },
    })

    expect(onHandleSavePaymentMethodMock).toBeCalled()
  })
})
