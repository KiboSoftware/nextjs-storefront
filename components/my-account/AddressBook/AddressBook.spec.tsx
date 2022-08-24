import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { mock } from 'jest-mock-extended'

import * as stories from './AddressBook.stories'
import { userResponseMock } from '@/__mocks__/stories/userMock'
import { createQueryClientWrapper } from '@/__test__/utils'
import { AuthContext, AuthContextType } from '@/context/'
const { Common } = composeStories(stories)

const AddressCardMock = () => <div data-testid="address-card-component" />
const AddressFormMock = () => <div data-testid="address-form-component" />
jest.mock('@/components/common/AddressCard/AddressCard', () => AddressCardMock)
jest.mock('@/components/common/AddressForm/AddressForm', () => AddressFormMock)

const setup = (isAuthenticated = false) => {
  const user = userEvent.setup()

  const mockValues = mock<AuthContextType>()
  mockValues.isAuthenticated = isAuthenticated
  isAuthenticated ? (mockValues.user = userResponseMock) : (mockValues.user = undefined)

  render(
    <AuthContext.Provider value={mockValues}>
      <Common />
    </AuthContext.Provider>,
    {
      wrapper: createQueryClientWrapper(),
    }
  )

  return {
    user,
  }
}

afterEach(() => {
  cleanup()
})

describe('[components] AddressBook', () => {
  it('should render component', async () => {
    const isAuthenticated = true
    setup(isAuthenticated)

    const addressBookComponent = screen.getByTestId(/address-book-component/i)
    const addNewAddressButton = screen.getByRole('button', {
      name: /add-new-address/i,
    })

    expect(addressBookComponent).toBeInTheDocument()
    expect(addNewAddressButton).toBeVisible()

    await waitFor(async () => {
      const primaryAddressHeading = screen.getByRole('heading', {
        name: /primary/i,
      })
      expect(primaryAddressHeading).toBeVisible()
    })
  })
})
