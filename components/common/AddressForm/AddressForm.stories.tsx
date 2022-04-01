import React, { useRef, ElementRef } from 'react'

import { Button } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressForm, { Data, Contact } from './AddressForm'

export default {
  component: AddressForm,
  title: 'Common/AddressForm',
  argTypes: { onSave: { action: 'clicked' } },
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
  contact: undefined,
  countries: ['US', 'AT', 'DE', 'NL'],
  isUserLoggedIn: false,
  saveAddressLabel: 'Save shipping address',
  onSave: (data: Data) => console.log('called handleSave(data) : ', data),
  ref: undefined,
}

// With LoggedIn User
export const ForLoggedInUser = Template.bind({})
ForLoggedInUser.args = {
  ...Common.args,
  isUserLoggedIn: true,
}

// WithDefault Values
const contact: Contact = {
  firstName: 'Shane',
  lastNameOrSurname: 'Warn',
  address: {
    address1: 'address 1',
    address2: 'address 2',
    cityOrTown: 'Sydney',
    stateOrProvince: 'New South Wales',
    postalOrZipCode: '411 033',
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
