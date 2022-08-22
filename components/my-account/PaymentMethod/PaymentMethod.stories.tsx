import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentMethod from './PaymentMethod'
import { DialogRoot, ModalContextProvider } from '@/context'
export default {
  title: 'My Profile/PaymentMethod',
  component: PaymentMethod,
} as ComponentMeta<typeof PaymentMethod>

const TestComponent = ({ args }: { args: any }) => {
  return (
    <>
      <ModalContextProvider>
        <DialogRoot />
        <PaymentMethod {...args} />
      </ModalContextProvider>
    </>
  )
}

const Template: ComponentStory<typeof PaymentMethod> = (args) => <TestComponent args={args} />

export const Common = Template.bind({})
Common.args = {
  user: {
    id: 1012,
  },
  cards: {
    totalCount: 1,
    items: [
      {
        id: '48e1dd6dedcd46e68237f16bb80f787f',
        nameOnCard: null,
        cardType: 'VISA',
        expireMonth: 1,
        expireYear: 2026,
        cardNumberPart: '************1111',
        contactId: 1511,
        isDefaultPayMethod: true,
      },
    ],
  },
  contacts: {
    pageCount: 1,
    totalCount: 3,
    pageSize: 10,
    startIndex: 0,
    items: [
      {
        accountId: 1012,
        types: [
          {
            name: 'Billing',
            isPrimary: false,
          },
        ],
        id: 1509,
        email: null,
        firstName: 'John',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Doe',
        phoneNumbers: {
          home: '85956545854',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'Lamar Street',
          address2: '32/1',
          address3: null,
          address4: null,
          cityOrTown: 'Austin ',
          stateOrProvince: 'TX',
          postalOrZipCode: '75759',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
      {
        accountId: 1012,
        types: [
          {
            name: 'Billing',
            isPrimary: false,
          },
        ],
        id: 1510,
        email: null,
        firstName: 'Chandradeepta',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Laha',
        phoneNumbers: {
          home: '4778574737',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'Test Street',
          address2: '32/23',
          address3: null,
          address4: null,
          cityOrTown: 'Austin',
          stateOrProvince: 'TX',
          postalOrZipCode: '748575',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
      {
        accountId: 1012,
        types: [
          {
            name: 'Billing',
            isPrimary: false,
          },
        ],
        id: 1511,
        email: null,
        firstName: 'John',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Doe',
        phoneNumbers: {
          home: '9894859583',
          mobile: null,
          work: null,
        },
        address: {
          address1: 'Test Address 2',
          address2: '12/1',
          address3: null,
          address4: null,
          cityOrTown: 'Austin',
          stateOrProvince: 'TX',
          postalOrZipCode: '74857',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
    ],
  },
}
