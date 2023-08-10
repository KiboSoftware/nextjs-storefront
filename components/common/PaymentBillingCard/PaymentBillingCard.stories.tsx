import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentBillingCard from './PaymentBillingCard'

// Common
export default {
  title: 'Common/PaymentBillingCard',
  component: PaymentBillingCard,
} as ComponentMeta<typeof PaymentBillingCard>

const Template: ComponentStory<typeof PaymentBillingCard> = (args) => (
  <PaymentBillingCard {...args} />
)

// Default
export const CreditCardPayment = Template.bind({})
CreditCardPayment.args = {
  cardNumberPart: '************1111',
  expireMonth: 12,
  expireYear: 2026,
  paymentType: 'CreditCard',
  cardType: 'VISA',
  address1: '900 HUTCHINSON PL',
  address2: '26',
  cityOrTown: 'LEBANON',
  postalOrZipCode: '37091',
  stateOrProvince: 'TN',
}

export const PurchaseOrderPayment = Template.bind({})
PurchaseOrderPayment.args = {
  purchaseOrderNumber: '896',
  paymentTerm: {
    description: '90',
    code: '90',
  },
  address1: '900 HUTCHINSON PL',
  address2: '',
  cityOrTown: 'LEBANON',
  postalOrZipCode: '37091',
  stateOrProvince: 'TN',
  paymentType: 'PurchaseOrder',
}
