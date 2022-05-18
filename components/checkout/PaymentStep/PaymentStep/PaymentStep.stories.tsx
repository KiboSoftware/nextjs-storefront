import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentStep, { CardPaymentDetails } from './PaymentStep'
import { Address } from '@/components/common/AddressForm/AddressForm'

export default {
  title: 'checkout/PaymentStep',
  component: PaymentStep,
  argTypes: { onSave: { action: 'clicked' }, onSaveCardPayment: { action: 'clicked' } },
} as ComponentMeta<typeof PaymentStep>

const Template: ComponentStory<typeof PaymentStep> = (args) => <PaymentStep {...args} />

// Common
export const Common = Template.bind({})

Common.args = {
  contact: undefined,
  countries: ['US', 'AT', 'DE', 'NL'],
  isUserLoggedIn: true,
  saveAddressLabel: 'Save billing address',
  onSave: (data: Address) => data,
  onSaveCardPayment: (data: CardPaymentDetails) => data,
}
