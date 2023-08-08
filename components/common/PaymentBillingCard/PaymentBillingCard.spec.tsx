import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './PaymentBillingCard.stories'

const { CreditCardPayment, PurchaseOrderPayment } = composeStories(stories)

const paymentCardMock = () => <div data-testid="payment-card-component" />
jest.mock('@/components/common/PaymentCard/PaymentCard', () => () => paymentCardMock())
const keyValueDisplayMock = () => <div data-testid="key-value-display-component" />
jest.mock('@/components/common/KeyValueDisplay/KeyValueDisplay', () => () => keyValueDisplayMock())

const addressCardMock = () => <div data-testid="address-card-component" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => addressCardMock())

describe('[component] - CreditCardPayment', () => {
  it('should render component', () => {
    render(<CreditCardPayment {...CreditCardPayment.args} />)

    expect(screen.getByTestId('payment-card-component')).toBeInTheDocument()
    expect(screen.getByTestId('address-card-component')).toBeInTheDocument()
  })
})

describe('[component] - PurchaseOrderPayment', () => {
  it('should render component', () => {
    render(<PurchaseOrderPayment {...PurchaseOrderPayment.args} />)

    expect(screen.getAllByTestId('key-value-display-component')[0]).toBeInTheDocument()
    expect(screen.getByTestId('address-card-component')).toBeInTheDocument()
  })
})
