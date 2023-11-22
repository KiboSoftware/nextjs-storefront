import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import getConfig from 'next/config'

import * as stories from './AccountsTable.stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext, DialogRoot, ModalContextProvider } from '@/context'

const { Common } = composeStories(stories)

const { publicRuntimeConfig } = getConfig()

publicRuntimeConfig.debounceTimeout = 1000

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  useMediaQuery: jest.fn(),
}))

const userContextValues = (isAuthenticated: boolean, userId: number) => ({
  isAuthenticated: isAuthenticated,
  user: {
    id: userId,
    roleName: 'Admin',
  },
  login: jest.fn(),
  createAccount: jest.fn(),
  setAuthError: jest.fn(),
  authError: '',
  logout: jest.fn(),
})
const setB2BContactsSearchParamMock = jest.fn()

const setup = () => {
  renderWithQueryClient(
    <AuthContext.Provider value={userContextValues(true, 1)}>
      <ModalContextProvider>
        <DialogRoot />
        <Common setB2BContactsSearchParam={setB2BContactsSearchParamMock} />
      </ModalContextProvider>
    </AuthContext.Provider>
  )
}

describe('[components] - Accounts Table', () => {
  it('should render the table', () => {
    setup()

    expect(screen.getByText('account-name')).toBeVisible()
    expect(screen.getByText('email')).toBeVisible()
    expect(screen.getByText('address')).toBeVisible()
    expect(screen.getByText('city-or-town')).toBeVisible()
    expect(screen.getByText('state-or-province')).toBeVisible()
    expect(screen.getByText('country-code')).toBeVisible()
    expect(screen.getByText('zip-code')).toBeVisible()
  })
})
