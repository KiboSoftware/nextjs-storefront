import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressList from './AddressList'
import { userAddressResponse } from '@/__mocks__/stories/userAddressMock'
import { userGetters } from '@/lib/getters'

import { CustomerContact } from '@/lib/gql/types'
export default {
  title: 'Common/AddressList',
  component: AddressList,
} as ComponentMeta<typeof AddressList>

const userShippingAddress = userGetters.getUserShippingAddress(
  userAddressResponse?.items as CustomerContact[]
)

const Template: ComponentStory<typeof AddressList> = (args) => <AddressList {...args} />

export const Common = Template.bind({})

Common.args = {
  addresses: userShippingAddress as CustomerContact[],
}

export const Radio = Template.bind({})

Radio.args = {
  radio: true,
  heading: 'Your default shipping address',
  subHeading: 'Your previouly saved shipping address',
  addresses: userShippingAddress as CustomerContact[],
}
export const WithoutRadio = Template.bind({})

WithoutRadio.args = {
  radio: false,
  heading: 'Your default shipping address',
  addresses: userShippingAddress as CustomerContact[],
}
