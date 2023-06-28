import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './EditBillingAddress.stories'
import { ModalContextProvider } from '@/context'
import { BillingAddress, CardType } from '@/lib/types'

const { Common } = composeStories(stories)

const billingAddressMockData: BillingAddress = {
  accountId: 123,
  contactId: 456,
  customerContactInput: {
    accountId: 123,
    address: {
      cityOrTown: 'New York',
      stateOrProvince: 'NY',
      postalOrZipCode: '10001',
    },
    companyOrOrganization: 'ABC Company',
    email: 'test@example.com',
    firstName: 'John',
    lastNameOrSurname: 'Doe',
    phoneNumbers: {
      home: '123-456-7890',
      work: '987-654-3210',
    },
    types: [
      {
        name: 'Billing',
        isPrimary: true,
      },
    ],
  },
}

const cardTypeMockData: CardType = {
  accountId: 123,
  cardId: 'abc123',
  cardInput: {
    id: undefined,
    contactId: 456,
    cardType: 'Visa',
    cardNumberPart: '************1234',
    expireMonth: 12,
    expireYear: 2025,
    isDefaultPayMethod: true,
  },
}

jest.mock('@/components/my-account/PaymentMethod/PaymentMethod', () => ({
  __esModule: true,
  default: ({
    onSave,
  }: {
    onSave: (address: BillingAddress, card: CardType, isUpdatingAddress: boolean) => void
  }) => (
    <div data-testid="address-form-mock">
      <button type="button" onClick={() => onSave(billingAddressMockData, cardTypeMockData, false)}>
        onSave
      </button>
    </div>
  ),
}))

const onSaveMock = jest.fn()
const onCloseMock = jest.fn()

const renderComponent = () => {
  return render(<Common {...Common.args} onSave={onSaveMock} onClose={onCloseMock} />, {
    wrapper: ModalContextProvider,
  })
}

const user = userEvent.setup()

describe('[components] EditBillingAddress', () => {
  const setup = () => renderComponent()

  it('should render component', async () => {
    setup()
    const title = screen.getByText('edit-billing-information')

    expect(title).toBeVisible()

    user.click(screen.getByRole('button', { name: 'onSave' }))

    await waitFor(() => {
      expect(onSaveMock).toBeCalled()
    })
  })
})
