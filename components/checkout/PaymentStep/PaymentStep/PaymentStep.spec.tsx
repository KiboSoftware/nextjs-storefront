import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, fireEvent } from '@testing-library/react'

import * as stories from './PaymentStep.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const onBlurMock = jest.fn()
const onHandleSavePaymentMethodMock = jest.fn()

const AddressFormMock = () => <div />
const CardDetailsFormMock = () => <div data-testid="card-details" />
const KiboTextBoxMock = () => <input data-testid="text-box-mock" onBlur={onBlurMock} />

jest.mock('../../../common/KiboTextBox/KiboTextBox', () => KiboTextBoxMock)
jest.mock('../CardDetailsForm/CardDetailsForm', () => CardDetailsFormMock)
jest.mock('../../../common/AddressForm/AddressForm', () => AddressFormMock)

describe('[components] PaymentStep', () => {
  const setup = () => render(<Common {...Common.args} />)

  it('should render component', () => {
    setup()
    const savePaymentMethod = screen.getByRole('checkbox', {
      name: /save-payment-method/i,
    })
    const copyShippingAddress = screen.getByRole('checkbox', {
      name: /copy-shipping-address/i,
    })
    const billingAddressHeading = screen.getByRole('heading', {
      name: /billing-address/i,
    })

    expect(savePaymentMethod).toBeInTheDocument()
    expect(copyShippingAddress).toBeInTheDocument()
    expect(billingAddressHeading).toBeInTheDocument()
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
