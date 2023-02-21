import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import EditBillingAddress from './EditBillingAddress'

export default {
  title: 'Dialogs/Edit Billing Address',
  component: EditBillingAddress,
} as ComponentMeta<typeof EditBillingAddress>

const Template: ComponentStory<typeof EditBillingAddress> = ({ ...args }) => (
  <EditBillingAddress {...args} />
)

// Common
export const Common = Template.bind({})

Common.args = {
  user: { id: 1 },
  cards: {
    items: [
      {
        id: '1b4286c7402c49daa8b71b34e5d31d7f',
        nameOnCard: null,
        cardType: 'VISA',
        expireMonth: 5,
        expireYear: 2025,
        cardNumberPart: '************5555',
        contactId: 1308,
        isDefaultPayMethod: false,
      },
      {
        id: 'aa5e9d5b32924c77a2c71f9b0e93810d',
        nameOnCard: null,
        cardType: 'VISA',
        expireMonth: 1,
        expireYear: 2025,
        cardNumberPart: '************1111',
        contactId: 1357,
        isDefaultPayMethod: false,
      },
    ],
    totalCount: 2,
  },
  contacts: {
    pageCount: 1,
    totalCount: 7,
    pageSize: 10,
    startIndex: 1,
    items: [
      {
        accountId: 1334,
        types: [{ isPrimary: true, name: 'Billing' }],
        id: 1308,
        email: 'kevin.watts@kibocommerce.com',
        firstName: 'Kevin',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Wattts',
        phoneNumbers: { home: '1231231234', mobile: null, work: null },
        address: { address1: '305 south lamar', address2: null },
      },
      {
        accountId: 1334,
        types: [{ isPrimary: false, name: 'Shipping' }],
        id: 1354,
        email: null,
        firstName: 'Kevin',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Watts',
        phoneNumbers: { home: '123456789', mobile: null, work: null },
        address: { address1: 'Street 1', address2: 'Apt 1' },
      },
    ],
  },
}
