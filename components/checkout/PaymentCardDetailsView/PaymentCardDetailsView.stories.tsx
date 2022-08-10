import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentCardDetailsView from './PaymentCardDetailsView'

export default {
  title: 'Checkout/PaymentCardDetailsView',
  component: PaymentCardDetailsView,
} as ComponentMeta<typeof PaymentCardDetailsView>

const Template: ComponentStory<typeof PaymentCardDetailsView> = (args) => (
  <PaymentCardDetailsView {...args} />
)

export const Common = Template.bind({})

Common.args = {
  withoutRadioTitle: 'Payment Method',
  cardNumberPart: '***********1234',
  expireMonth: 4,
  expireYear: 2026,
  radio: false,
}

export const Radio = Template.bind({})

Radio.args = {
  ...Common.args,
  radio: true,
  radioGroupTitle: 'Your Default Payment method',
}
