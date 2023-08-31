import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import AccountHierarchyTemplate from './AccountHierarchyTemplate'
import { b2BAccountHierarchyResult, hierarchyTreeMock } from '@/__mocks__/stories'
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

const Template: ComponentStory<typeof AccountHierarchyTemplate> = (args) => (
  <ModalContextProvider>
    <AuthContext.Provider value={userContextValues(true, 1001)}>
      <AccountHierarchyTemplate {...args} />
      <DialogRoot />
    </AuthContext.Provider>
  </ModalContextProvider>
)

export const Common = Template.bind({})

Common.args = {
  initialData: {
    accounts: b2BAccountHierarchyResult.accounts,
    hierarchy: hierarchyTreeMock,
  },
}
