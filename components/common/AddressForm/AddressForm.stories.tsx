import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressForm from './AddressForm'
import type { Address, ContactForm } from '@/lib/types'

export default {
  component: AddressForm,
  title: 'Common/AddressForm',
  argTypes: { onSaveAddress: { action: 'clicked' } },
} as ComponentMeta<typeof AddressForm>

const Template: ComponentStory<typeof AddressForm> = (args) => {
  return (
    <div>
      <AddressForm {...args} />
    </div>
  )
}

// Default
export const Common = Template.bind({})
Common.args = {
  setAutoFocus: true,
  contact: undefined,
  isUserLoggedIn: false,
  saveAddressLabel: 'Save shipping address',
  onSaveAddress: (data: Address) => console.log('called handleSave(data) : ', data),
}

// With LoggedIn User
export const ForLoggedInUser = Template.bind({})
ForLoggedInUser.args = {
  ...Common.args,
  isUserLoggedIn: true,
}

// WithDefault Values
const contact: ContactForm = {
  firstName: 'Shane',
  lastNameOrSurname: 'Warn',
  address: {
    address1: 'address 1',
    address2: 'address 2',
    cityOrTown: 'Sydney',
    stateOrProvince: 'New South Wales',
    postalOrZipCode: '41103',
    countryCode: 'DE',
  },
  phoneNumbers: {
    home: '9921215096',
  },
}
export const WithProps = Template.bind({})
WithProps.args = {
  ...Common.args,
  contact,
}
