import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import UsersTemplate from './UsersTemplate'
import { customerB2BUserForPage0Mock } from '@/__mocks__/stories'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context'

export default {
  title: 'Page Templates/B2B/UsersTemplate',
  component: UsersTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof UsersTemplate>

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

const Template: ComponentStory<typeof UsersTemplate> = () => (
  <ModalContextProvider>
    <AuthContext.Provider value={userContextValues(true, 1001)}>
      <UsersTemplate />
      <DialogRoot />
    </AuthContext.Provider>
  </ModalContextProvider>
)

export const Common = Template.bind({})

Common.parameters = {
  msw: {
    handlers: {
      b2bAccountUsers: graphql.query('b2bAccountUsers', (_req, res, ctx) => {
        return res(ctx.data({ b2bAccountUsers: customerB2BUserForPage0Mock }))
      }),
    },
  },
}
