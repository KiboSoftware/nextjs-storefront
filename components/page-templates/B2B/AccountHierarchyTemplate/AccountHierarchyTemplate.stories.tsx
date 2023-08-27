import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTemplate from './AccountHierarchyTemplate'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context'

export default {
  title: 'Page Templates/B2B/AccountHierarchyTemplate',
  component: AccountHierarchyTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof AccountHierarchyTemplate>

const userContextValues = (isAuthenticated: boolean, userId: number) => ({
  isAuthenticated: isAuthenticated,
  user: {
    id: userId,
  },
  login: () => null,
  createAccount: () => null,
  setAuthError: () => null,
  authError: '',
  logout: () => null,
})

const Template: ComponentStory<typeof AccountHierarchyTemplate> = () => (
  <ModalContextProvider>
    <AuthContext.Provider value={userContextValues(true, 1001)}>
      <AccountHierarchyTemplate />
      <DialogRoot />
    </AuthContext.Provider>
  </ModalContextProvider>
)

export const Common = Template.bind({})
