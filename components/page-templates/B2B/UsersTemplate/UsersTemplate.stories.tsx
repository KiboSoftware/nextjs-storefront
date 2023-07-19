import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'
import { graphql } from 'msw'

import UsersTemplate from './UsersTemplate'
import {
  customerB2BUserForPage0Mock,
  customerB2BUserForPage1Mock,
  customerB2BUserForPage2Mock,
} from '@/__mocks__/stories'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context'

import { B2BUser } from '@/lib/gql/types'

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
        const { startIndex, q } = _req.variables

        if (q) {
          const allUsers: B2BUser[] = [
            ...(customerB2BUserForPage0Mock?.items as B2BUser[]),
            ...(customerB2BUserForPage1Mock?.items as B2BUser[]),
            ...(customerB2BUserForPage2Mock?.items as B2BUser[]),
          ]
          const filteredUsers = allUsers.filter(({ firstName, lastName, emailAddress }) =>
            [
              firstName?.toLowerCase(),
              lastName?.toLowerCase(),
              emailAddress?.toLowerCase(),
            ].includes(q.toLowerCase())
          )
          return res(
            ctx.data({
              b2bAccountUsers: {
                items: filteredUsers,
                totalCount: filteredUsers.length,
                startIndex: 0,
                pageSize: 5,
                pageCount: 1,
              },
            })
          )
        }

        if (startIndex == 0) {
          return res(ctx.data({ b2bAccountUsers: customerB2BUserForPage0Mock }))
        } else if (startIndex == 5) {
          return res(ctx.data({ b2bAccountUsers: customerB2BUserForPage1Mock }))
        } else return res(ctx.data({ b2bAccountUsers: customerB2BUserForPage2Mock }))
      }),
    },
  },
}
