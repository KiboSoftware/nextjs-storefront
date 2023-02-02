import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { screen, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import * as stories from './StandardShippingStep.stories'
import { server } from '@/__mocks__/msw/server'
import { orderMock, shippingRateMock, userAddressResponse } from '@/__mocks__/stories'
import { renderWithQueryClient } from '@/__test__/utils'
import { AuthContext } from '@/context'
import { addressGetters, userGetters } from '@/lib/getters'
import { Address } from '@/lib/types'

import { CrOrder, CustomerContact, CustomerContactCollection } from '@/lib/gql/types'

const { Common } = composeStories(stories)

const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

jest.mock('../../common/AddressForm/AddressForm', () => ({
  __esModule: true,
  default: ({
    onSaveAddress,
    onFormStatusChange,
  }: {
    onSaveAddress: (address: Address) => void
    onFormStatusChange: (isValid: boolean) => void
  }) => (
    <div data-testid="address-form-mock">
      <button
        type="button"
        data-testid="changeBillingFormStatus"
        onClick={() => onFormStatusChange(true)}
      >
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

const updatedFulfillmentMock = {
  ...orderMock.checkout.fulfillmentInfo,
  fulfillmentContact: {
    email: 'test@email.com',
    firstName: 'jon',
    id: 1,
    middleNameOrInitial: null,
    lastNameOrSurname: 'doe',
    companyOrOrganization: null,
    phoneNumbers: {
      home: '9938938494',
      mobile: null,
      work: null,
    },
    address: {
      address1: '400, Lamar Street',
      address2: '23/1',
      address3: null,
      address4: null,
      cityOrTown: 'Austin',
      stateOrProvince: 'TX',
      postalOrZipCode: '98984',
      countryCode: 'US',
      addressType: null,
      isValidated: false,
    },
  },
}

const selectDefaultShippingAddress = async (user: any) => {
  const defaultAddress = userAddressResponse.items?.find((each) =>
    each?.types?.find((type) => type?.isPrimary)
  )

  const defaultAddressRadioName = `${addressGetters.getAddress1(
    defaultAddress?.address
  )},${addressGetters.getAddress2(defaultAddress?.address)},${addressGetters.getCityOrTown(
    defaultAddress?.address
  )},${addressGetters.getStateOrProvince(
    defaultAddress?.address
  )},${addressGetters.getPostalOrZipCode(defaultAddress?.address)}`

  const defaultAddressRadio = screen.getByRole('radio', {
    name: defaultAddressRadioName,
  })

  expect(defaultAddressRadio).not.toBeChecked()

  await user.click(defaultAddressRadio)

  expect(defaultAddressRadio).toBeChecked()
}

const selectShippingMethod = async (user: any) => {
  const shippingMethodSelect = screen.getByRole('button', { name: 'Select Shipping Option' })

  fireEvent.mouseDown(shippingMethodSelect)

  const option = within(screen.getByRole('listbox')).getByText(
    `${shippingRateMock.orderShipmentMethods?.[0]?.shippingMethodName as string} currency`
  )

  server.use(
    graphql.query('getCheckout', (_req, res, ctx) => {
      return res(
        ctx.data({
          checkout: {
            ...orderMock.checkout,
            email: 'test@email.com',
            fulfillmentInfo: {
              ...orderMock.checkout.fulfillmentInfo,
              ...updatedFulfillmentMock,
              shippingMethodCode: 'f863f9f5d4cf4f088105ae3200fd4f9b',
              shippingMethodName: 'Second Day Air',
            },
          },
        })
      )
    })
  )

  await user.click(option)
}

describe('[components] StandardShippingStep', () => {
  describe('Authenticated User', () => {
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

        expect(screen.queryByRole('radio')).not.toBeInTheDocument()
      })

      it('should display shipping address form', async () => {
        setup({
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
    })

    describe('There are previously saved shipping address in account but not in checkout', () => {
      it('should display shipping address(saved in account) radio buttons and select a radio button to select Shipping Methods', async () => {
        const { user } = setup({
          checkout: {
            ...orderMock.checkout,
            fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
          },
          isAuthenticated: true,
          userId: 0,
          savedUserAddressData: userAddressResponse,
        })

        expect(screen.getAllByRole('radio').length).toBe(
          userGetters.getUserShippingAddress(userAddressResponse.items as CustomerContact[])?.length
        )

        await selectDefaultShippingAddress(user)

        await selectShippingMethod(user)

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
          expect(screen.getAllByRole('radio').length).toBe(radioCount)
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

        await selectDefaultShippingAddress(user)

        await selectShippingMethod(user)

        expect(scrollIntoViewMock).toBeCalled()
      })
    })
  })
})
