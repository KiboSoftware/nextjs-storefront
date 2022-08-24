import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AddressBook from './AddressBook'
import { userResponseMock } from '@/__mocks__/stories/userMock'
import { AuthContext, AuthContextType, DialogRoot, ModalContextProvider } from '@/context'

export default {
  title: 'My Account / Address Book',
  component: AddressBook,
} as ComponentMeta<typeof AddressBook>

const userContextValues: AuthContextType = {
  isAuthenticated: true,
  login: () => console.log('Login'),
  user: userResponseMock,
  createAccount: () => console.log('createAccount'),
  setAuthError: () => console.log('setAuthError'),
  authError: '',
  logout: () => console.log('logout'),
}

const Template: ComponentStory<typeof AddressBook> = () => (
  <AuthContext.Provider value={userContextValues}>
    <ModalContextProvider>
      <DialogRoot />
      <AddressBook />
    </ModalContextProvider>
  </AuthContext.Provider>
)

export const Common = Template.bind({})
