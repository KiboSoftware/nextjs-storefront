import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import BillingAddressDetailsView from './BillingAddressDetailsView'

export default {
  title: 'Checkout/BillingAddressDetailsView',
  component: BillingAddressDetailsView,
} as ComponentMeta<typeof BillingAddressDetailsView>

const Template: ComponentStory<typeof BillingAddressDetailsView> = (args) => (
  <BillingAddressDetailsView {...args} />
)

export const Common = Template.bind({})

Common.args = {
  title: 'Billing Address',
  apartment: '1104',
  streetAddress: '1234, My Address',
  city: 'Austin',
  state: 'Texas',
  zipCode: '78727',
}

export const Radio = Template.bind({})

Radio.args = {
  ...Common.args,
  radio: true,
}
