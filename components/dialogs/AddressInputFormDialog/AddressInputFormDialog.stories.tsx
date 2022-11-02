import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressInputFormDialog from './AddressInputFormDialog'
import type { Address, ContactForm } from '@/lib/types'

export default {
  title: 'Dialogs/AddressInputFormDialog/Dialog',
  component: AddressInputFormDialog,
  argTypes: { onClose: { action: 'onClose' } },
} as ComponentMeta<typeof AddressInputFormDialog>

const Template: ComponentStory<typeof AddressInputFormDialog> = ({ ...args }) => (
  <AddressInputFormDialog {...args} />
)

// Common
export const Common = Template.bind({})
Common.args = {
  isAddressFormValid: true,
  setAutoFocus: true,
  validateForm: false,
  isAddressFormInDialog: true,
  onSaveAddress: (data: Address) => console.log('called handleSave(data) : ', data),
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
