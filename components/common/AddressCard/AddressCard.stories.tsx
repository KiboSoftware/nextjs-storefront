import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressCard from './AddressCard'

export default {
  title: 'Common/AddressCard',
  component: AddressCard,
} as ComponentMeta<typeof AddressCard>

const Template: ComponentStory<typeof AddressCard> = (args) => <AddressCard {...args} />

export const Common = Template.bind({})

Common.args = {
  title: 'Billing Address',
  address1: '1234, My Address',
  address2: '1104',
  cityOrTown: 'Austin',
  stateOrProvince: 'Texas',
  postalOrZipCode: '78727',
}
