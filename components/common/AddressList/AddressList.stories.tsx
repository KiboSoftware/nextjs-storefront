import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressList from './AddressList'
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'

import { CustomerContact } from '@/lib/gql/types'
export default {
  title: 'Common/AddressList',
  component: AddressList,
} as ComponentMeta<typeof AddressList>

const Template: ComponentStory<typeof AddressList> = (args) => <AddressList {...args} />

export const Common = Template.bind({})

Common.args = {
  addresses: userAddressResponse.items as CustomerContact[],
}

export const Radio = Template.bind({})

Radio.args = {
  radio: true,
  heading: 'Your default shipping address',
  subHeading: 'Your previouly saved shipping address',
  addresses: userAddressResponse.items as CustomerContact[],
}
export const WithoutRadio = Template.bind({})

WithoutRadio.args = {
  radio: false,
  heading: 'Your default shipping address',
  addresses: userAddressResponse.items as CustomerContact[],
}
