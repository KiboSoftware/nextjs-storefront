import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressDetailsView from './AddressDetailsView'

export default {
  title: 'Checkout/AddressDetailsView',
  component: AddressDetailsView,
} as ComponentMeta<typeof AddressDetailsView>

const Template: ComponentStory<typeof AddressDetailsView> = (args) => (
  <AddressDetailsView {...args} />
)

export const Common = Template.bind({})

Common.args = {
  withoutRadioTitle: 'Billing Address',
  address1: '1234, My Address',
  address2: '1104',
  cityOrTown: 'Austin',
  stateOrProvince: 'Texas',
  postalOrZipCode: '78727',
}

export const Radio = Template.bind({})

Radio.args = {
  radio: true,
  address1: '1234, My Address',
  address2: '1104',
  cityOrTown: 'Austin',
  stateOrProvince: 'Texas',
  postalOrZipCode: '78727',
  id: 1092,
  selected: 1012,
}
