import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import PaymentMethod from './PaymentMethod'
import { customerAccountCardsMock } from '@/__mocks__/stories/customerAccountCardsMock'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
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
  cards: customerAccountCardsMock.customerAccountCards,
  contacts: userAddressMock.customerAccountContacts,
}

export const NoSavedCards = Template.bind({})
NoSavedCards.args = {
  user: {
    id: 1012,
  },
  cards: {
    totalCount: 0,
    items: [],
  },
  contacts: {
    pageCount: 1,
    totalCount: 0,
    pageSize: 10,
    startIndex: 0,
    items: [],
  },
}
