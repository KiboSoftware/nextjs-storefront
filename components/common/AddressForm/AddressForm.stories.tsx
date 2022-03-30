import React, { useRef, ElementRef } from 'react'

import { Button } from '@mui/material'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressForm, { Data, Contact } from './AddressForm'

export default {
  component: AddressForm,
  title: 'Common/AddressForm',
} as ComponentMeta<typeof AddressForm>

const Template: ComponentStory<typeof AddressForm> = (args) => {
  type AddressFormHandler = ElementRef<typeof AddressForm>
  const ref = useRef<AddressFormHandler | null>(null)
  const handleSave = (data: Data) => console.log('data: ', data)
  const handleClick = () => {
    if (!ref.current) return
    ref.current.listener()
  }

  const props = args ? args : { isUserLoggedIn: false, onSave: handleSave, ref: ref }
  return (
    <div>
      <AddressForm {...props} />
      <Button variant="contained" onClick={handleClick}>
        Save
      </Button>
    </div>
  )
}

// Default
export const Common = Template.bind({})

// With LoggedIn User
export const ForLoggedInUser = Template.bind({})
ForLoggedInUser.args = {
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
  contact,
}
