import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './StandardShippingStep.stories'
import { orderMock, shippingRateMock, userAddressResponse } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext } from '@/context'
import { userGetters } from '@/lib/getters'
import { Address } from '@/lib/types'

import { CrOrder, CustomerContact, CustomerContactCollection } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

interface ShippingMethodProps {
  id: number
  selected: string
  onShippingMethodChange: (shippingMethodCode: string) => void
}
jest.mock('../../checkout/ShippingMethod/ShippingMethod', () => ({
  __esModule: true,
  default: ({ selected, onShippingMethodChange }: ShippingMethodProps) => (
    <div data-testid="addressDetailsView-mock">
      <p data-testid="selectedAddressDetailsView">{selected}</p>
      <button
        onClick={() =>
          onShippingMethodChange(
            shippingRateMock.orderShipmentMethods?.[0].shippingMethodCode as string
          )
        }
      >
        handleSaveShippingMethod
      </button>
    </div>
  ),
}))

interface AddressDetailsViewProps {
  id: number
  selected: string
  handleRadioChange: (addressId: string) => void
}
jest.mock('../../common/AddressDetailsView/AddressDetailsView', () => ({
  __esModule: true,
  default: ({ id, selected, handleRadioChange }: AddressDetailsViewProps) => (
    <div data-testid="addressDetailsView-mock">
      <p data-testId="selectedAddressDetailsView">{selected}</p>
      <button onClick={() => handleRadioChange(String(id))}>handleAddressSelect</button>
    </div>
  ),
}))

interface AddressFormProps {
  validateForm: boolean
  onSaveAddress: (address: Address) => void
  onFormStatusChange: (isValid: boolean) => void
}
jest.mock('../../common/AddressForm/AddressForm', () => ({
  __esModule: true,
  default: ({ validateForm, onSaveAddress, onFormStatusChange }: AddressFormProps) => (
    <div data-testid="address-form-mock">
      <p data-testid="isValidateForm">{validateForm ? 'validatedForm' : 'invalidatedForm'}</p>
      <button type="button" data-testid="changeFormStatus" onClick={() => onFormStatusChange(true)}>
        Change Address Form Status
      </button>
      <button
        type="button"
        data-testid="saveAddressButton"
        onClick={() =>
          onSaveAddress({
            contact: {
              email: 'amolp@dev.com',
              firstName: 'jon',
              lastNameOrSurname: 'doe',
              phoneNumbers: {
                home: '3354533453',
              },
              address: {
                address1: 'street',
                address2: 'apartment',
                cityOrTown: 'city',
                stateOrProvince: 'state',
                postalOrZipCode: '23423',
                countryCode: 'US',
                isValidated: false,
              },
            },
            isAddressValid: true,
          })
        }
      >
        Save Address
      </button>
    </div>
  ),
}))

const userContextValues = (isAuthenticated: boolean, userId: number) => ({
  isAuthenticated: isAuthenticated,
  user: {
    id: userId,
  },
  login: jest.fn(),
  createAccount: jest.fn(),
  setAuthError: jest.fn(),
  authError: '',
  logout: jest.fn(),
})

const setup = (param: {
  checkout: CrOrder
  isAuthenticated: boolean
  userId: number
  savedUserAddressData?: CustomerContactCollection
}) => {
  const user = userEvent.setup()
  const { checkout, isAuthenticated, userId, savedUserAddressData = [] } = param

  renderWithQueryClient(
    <AuthContext.Provider value={userContextValues(isAuthenticated, userId)}>
      <Common
        {...Common.args}
        checkout={checkout}
        savedUserAddressData={savedUserAddressData as CustomerContactCollection}
      />
    </AuthContext.Provider>
  )

  return {
    user,
  }
}

describe('[components] StandardShippingStep', () => {
  describe('There are no previously saved shipping addresses to choose from', () => {
    it('should not display previously saved shipping address radio buttons', () => {
      setup({
        checkout: {
          ...orderMock.checkout,
          fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
        },
        isAuthenticated: true,
        userId: 0,
      })

      expect(screen.queryByTestId('addressDetailsView-mock')).not.toBeInTheDocument()
    })

    it('should display shipping address form', async () => {
      const { user } = setup({
        checkout: {
          ...orderMock.checkout,
          fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
        },
        isAuthenticated: true,
        userId: 0,
      })

      expect(screen.getByTestId('address-form-mock')).toBeVisible()
      expect(screen.getByRole('button', { name: /save-shipping-address/ })).toBeVisible()
      expect(screen.getByRole('button', { name: /cancel/ })).toBeVisible()
    })

    it('should handle AddressForm properly', async () => {
      const { user } = setup({
        checkout: {
          ...orderMock.checkout,
          fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
        },
        isAuthenticated: true,
        userId: 0,
      })

      expect(screen.getByTestId('address-form-mock')).toBeVisible()
      expect(screen.getByTestId('isValidateForm')).toHaveTextContent('invalidatedForm')

      await user.click(screen.getByTestId('changeFormStatus'))

      await user.click(screen.getByRole('button', { name: /save-shipping-address/ }))

      expect(screen.getByTestId('isValidateForm')).toHaveTextContent('validatedForm')
    })
  })

  describe('There are previously saved shipping address in account but not in checkout', () => {
    it('should select a shipping address radio button and shippingMethod should be selected', async () => {
      const { user } = setup({
        checkout: {
          ...orderMock.checkout,
          fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
        },
        isAuthenticated: true,
        userId: 0,
        savedUserAddressData: userAddressResponse,
      })

      expect(screen.getAllByTestId('addressDetailsView-mock').length).toBe(
        userGetters.getUserShippingAddress(userAddressResponse.items as CustomerContact[])?.length
      )

      // selecting a radioAddress
      const firstRadioAddress = screen.getAllByRole('button', { name: /handleAddressSelect/ })[0]

      await user.click(firstRadioAddress)

      const selected = userGetters.getUserShippingAddress(
        userAddressResponse?.items as CustomerContact[]
      )?.[0].id

      expect(screen.getAllByTestId(/selectedAddressDetailsView/)?.[0].textContent).toBe(
        selected?.toString()
      )

      const firstShippingMethod = screen.getAllByRole('button', {
        name: /handleSaveShippingMethod/,
      })[0]

      await user.click(firstShippingMethod)

      expect(scrollIntoViewMock).toBeCalled()
    })
  })

  describe('There are previously saved shipping address in account and checkout', () => {
    it('should display shipping address radio buttons(saved in account and checkout)', async () => {
      setup({
        checkout: {
          ...orderMock.checkout,
        },
        isAuthenticated: true,
        userId: 0,
        savedUserAddressData: userAddressResponse,
      })

      const radioCount =
        (userGetters.getUserShippingAddress(userAddressResponse.items as CustomerContact[])
          ?.length as number) + 1

      await waitFor(() => {
        expect(screen.getAllByTestId('addressDetailsView-mock').length).toBe(radioCount)
      })
    })

    it('should select a shipping address radio button and shippingMethod should be selected', async () => {
      const { user } = setup({
        checkout: {
          ...orderMock.checkout,
        },
        isAuthenticated: true,
        userId: 0,
        savedUserAddressData: userAddressResponse,
      })

      const firstRadioAddress = screen.getAllByRole('button', { name: /handleAddressSelect/ })[0]

      await user.click(firstRadioAddress)

      const selected = userGetters.getUserShippingAddress(
        userAddressResponse?.items as CustomerContact[]
      )?.[0].id

      expect(screen.getAllByTestId(/selectedAddressDetailsView/)?.[0].textContent).toBe(
        selected?.toString()
      )

      const firstShippingMethod = screen.getAllByRole('button', {
        name: /handleSaveShippingMethod/,
      })[0]

      await user.click(firstShippingMethod)

      await waitFor(() => {
        expect(scrollIntoViewMock).toBeCalled()
      })
    })
  })
})
