import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressBook from './AddressBook'
import { userAddressMock } from '@/__mocks__/stories/userAddressMock'
import { DialogRoot, ModalContextProvider } from '@/context'

export default {
  title: 'My Account / Address Book',
  component: AddressBook,
} as ComponentMeta<typeof AddressBook>

const TestComponent = ({ args }: { args: any }) => {
  return (
    <>
      <ModalContextProvider>
        <DialogRoot />
        <AddressBook {...args} />
      </ModalContextProvider>
    </>
  )
}

const Template: ComponentStory<typeof AddressBook> = (args) => <TestComponent args={args} />

export const Common = Template.bind({})
Common.args = {
  user: {
    id: 1012,
  },
  contacts: userAddressMock.customerAccountContacts,
}
