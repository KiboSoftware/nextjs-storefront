import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import SavedPaymentMethodView from './SavedPaymentMethodView'

export default {
  title: 'Checkout/SavedPaymentMethodView',
  component: SavedPaymentMethodView,
} as ComponentMeta<typeof SavedPaymentMethodView>

const Template: ComponentStory<typeof SavedPaymentMethodView> = (args) => (
  <SavedPaymentMethodView {...args} />
)

export const Common = Template.bind({})

Common.args = {
  customerAccountCards: {
    cardNumberPart: '***********1111',
    expireMonth: 4,
    expireYear: 2026,
    contactId: 1029,
  },
  billingAddress: {
    address1: '1234, My Address',
    address2: '1104',
    cityOrTown: 'Austin',
    postalOrZipCode: '78727',
    stateOrProvince: 'Texas',
  },
}
