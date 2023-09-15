import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './AddressBook.stories'
const { Common } = composeStories(stories)

const AddressCardMock = () => <div data-testid="address-card-component" />
const AddressFormMock = () => <div data-testid="address-form-component" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => AddressCardMock())
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())
jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))
const setup = () => {
  const user = userEvent.setup()

  render(<Common {...Common.args} />)

  return {
    user,
  }
}

describe('[components] AddressBook', () => {
  it('should render all saved addresses', () => {
    setup()
    const primaryAddressHeading = screen.getByText(/shipping-address/i)

    const editAddresses = screen.getAllByText('edit')
    const deleteAddressIcon = screen.getByTestId('DeleteIcon')

    expect(primaryAddressHeading).toBeVisible()
    expect(editAddresses[0]).toBeVisible()
    expect(deleteAddressIcon).toBeVisible()
  })

  it(`should render address form if 'Add New Address' button is clicked`, async () => {
    const { user } = setup()

    user.click(screen.getByRole('button', { name: 'add-new-address' }))

    await waitFor(() => {
      expect(screen.getByTestId('address-form-component')).toBeVisible()
    })
  })

  it(`should render addressForm if 'Edit' is clicked`, async () => {
    const { user } = setup()

    const addNewAddress = screen.getByRole('button', { name: 'add-new-address' })

    const editAddresses = screen.getAllByText('edit')
    user.click(editAddresses[0])

    await waitFor(() => {
      expect(addNewAddress).not.toBeVisible()
    })
    await waitFor(() => {
      expect(screen.getByTestId('address-form-component')).toBeVisible()
    })
  })
})
