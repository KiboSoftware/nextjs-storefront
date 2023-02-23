import React from 'react'

import '@testing-library/jest-dom'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { graphql } from 'msw'

import * as stories from './SubscriptionItem.stories'
import { server } from '@/__mocks__/msw/server'
import { subscriptionMock, customerAccountCardsMock, userAddressMock } from '@/__mocks__/stories'
import { subscriptionItemMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { subscriptionGetters, userGetters } from '@/lib/getters'
import type { Address, PaymentAndBilling, BillingAddress, CardType } from '@/lib/types'

import { CardCollection, CustomerContactCollection } from '@/lib/gql/types'

const { Common } = composeStories(stories)
const subscriptionItem = subscriptionItemMock?.items

// Types
interface OnFrequencySave {
  subscriptionId: string
  frequencyInput: {
    value: number
    unit: string
  }
}

interface EditSubscriptionFrequencyDialogProps {
  onFrequencySave: (params: OnFrequencySave) => void
  onClose: () => void
}

interface EditOrderDateDialogProps {
  onOrderDateUpdate: (subscriptionId: string, orderDate: string) => void
  onClose: () => void
}

interface AddressFormDialogProps {
  onSaveAddress: (data: Address) => void
}

interface ConfirmationDialogProps {
  onConfirm: () => void
}

interface KiboSelectProps {
  children: React.ReactNode
  onChange: (name: string, value: string) => void
  value: string
  placeholder: string
}

interface EditBillingAddressProps {
  onSave: (address: BillingAddress, card: CardType) => void
  onClose: () => void
}

// Mock
jest.mock('@/components/dialogs', () => ({
  __esModule: true,
  ConfirmationDialog: (props: ConfirmationDialogProps) => {
    return (
      <div>
        <h1>confirmation-dialog</h1>
        <button onClick={() => props.onConfirm()}>Confirm</button>
      </div>
    )
  },
  EditSubscriptionFrequencyDialog: (props: EditSubscriptionFrequencyDialogProps) => {
    const params = {
      subscriptionId: '',
      frequencyInput: {
        unit: 'Day',
        value: 5,
      },
    }

    return (
      <div>
        <h1>edit-subscription-frequency-dialog</h1>
        <button onClick={() => props.onFrequencySave(params)}>Confirm</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    )
  },
  EditOrderDateDialog: (props: EditOrderDateDialogProps) => {
    return (
      <div>
        <h1>edit-order-date-dialog</h1>
        <button onClick={() => props.onOrderDateUpdate('1', '01/01/2030')}>Confirm</button>
        <button onClick={props.onClose}>Close</button>
      </div>
    )
  },
  AddressFormDialog: (props: AddressFormDialogProps) => {
    const params = {
      contact: {
        firstName: 'firstName',
        lastNameOrSurname: 'lastNameOrSurname',
        middleNameOrInitial: 'middleNameOrInitial',
        email: 'abc@mail.com',
        address: {
          address1: 'address1',
          address2: 'address2',
          cityOrTown: 'cityOrTown',
          countryCode: 'US',
          postalOrZipCode: '12345',
          stateOrProvince: 'stateOrProvince',
        },
        phoneNumbers: {
          home: '123456789',
        },
      },
    }

    return (
      <div>
        <h1>address-form-dialog</h1>
        <button onClick={() => props.onSaveAddress(params)}>Confirm</button>
      </div>
    )
  },
  EditBillingAddress: (props: EditBillingAddressProps) => {
    const address: BillingAddress = {
      accountId: 1334,
      contactId: 1354,
      customerContactInput: {
        accountId: 1334,
        types: [{ name: 'Billing', isPrimary: false }],
        id: 1354,
        email: null,
        firstName: 'Kevin',
        middleNameOrInitial: null,
        lastNameOrSurname: 'Watts',
        phoneNumbers: { home: '123456789', mobile: null, work: null },
        address: {
          address1: 'Street 1',
          address2: 'Apt 1',
          address3: null,
          address4: null,
          cityOrTown: 'Pune',
          stateOrProvince: 'MH',
          postalOrZipCode: '12345',
          countryCode: 'US',
          addressType: 'Residential',
          isValidated: false,
        },
      },
    }

    const card: CardType = {
      accountId: 1334,
      cardId: '',
      cardInput: {
        id: 'de6f29bebe9a43d1bead2480bb244418',
        contactId: 0,
        cardType: 'VISA',
        cardNumberPart: '4111111111111111',
        expireMonth: 1,
        expireYear: 2030,
        isDefaultPayMethod: false,
      },
    }

    return (
      <div>
        <h1>edit-billing-address-mock</h1>
        <button onClick={() => props.onSave(address, card)}>confirm</button>
      </div>
    )
  },
}))

jest.mock('@/components/common/KiboSelect/KiboSelect', () => ({
  __esModule: true,
  default: ({ children, onChange, value = '', placeholder }: KiboSelectProps) => (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">select-address</InputLabel>
      <Select
        data-testid="KiboSelect"
        value={value}
        label="kibo-select" //Shipping Address
        onChange={(event) => onChange(event.target.name, event.target.value)}
      >
        <MenuItem value={''} disabled sx={{ display: 'none' }}>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
    </FormControl>
  ),
}))

describe('[component] - SubscriptionItem', () => {
  const setup = () => {
    const user = userEvent.setup()

    server.use(
      graphql.mutation('customerAccountCards', (_req, res, ctx) => {
        return res(ctx.data(customerAccountCardsMock))
      }),
      graphql.mutation('getUserAddresses', (_req, res, ctx) => {
        return res(ctx.data(userAddressMock))
      })
    )

    render(<Common />, {
      wrapper: createQueryClientWrapper(),
    })
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()
    const subscriptionNumber = screen.getByText(/subscription-number/i)
    const status = screen.getByText(/status/i)
    const shipmentFrequency = screen.getByText(/shipment-frequency/i)
    const nextArrivalDate = screen.getByText(/estimated-next-arrival-date/i)
    const shipItemNowButton = screen.getByRole('button', {
      name: /ship-now/i,
    })
    const skipShipmentButton = screen.getByRole('button', {
      name: /skip-shipment/i,
    })
    const editFrequencyButton = screen.getByRole('button', {
      name: /edit-frequency/i,
    })
    const editOrderDateButton = screen.getByRole('button', {
      name: /edit-order-date/i,
    })
    const cancelAnItemButton = screen.getByRole('button', {
      name: /cancel-subscription/i,
    })
    const editBillingInformationButton = screen.getByRole('button', {
      name: /edit-billing-information/i,
    })
    const editShippingAddressButton = screen.getByRole('button', {
      name: /edit-shipping-address/i,
    })
    const pauseSubscriptionButton = screen.getByRole('button', {
      name: /pause-subscription/i,
    })

    expect(
      screen.getByText(subscriptionGetters.getSubscriberName(subscriptionItem))
    ).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriberAddress(subscriptionItem))
    ).toBeInTheDocument()
    expect(subscriptionNumber).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(status).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(shipmentFrequency).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(nextArrivalDate).toBeInTheDocument()
    expect(
      screen.getByText(subscriptionGetters.getSubscriptionNumber(subscriptionItem))
    ).toBeVisible()
    expect(skipShipmentButton).toBeVisible()
    expect(shipItemNowButton).toBeVisible()
    expect(editFrequencyButton).toBeVisible()
    expect(editOrderDateButton).toBeVisible()
    expect(cancelAnItemButton).toBeVisible()
    expect(editBillingInformationButton).toBeVisible()
    expect(editShippingAddressButton).toBeVisible()
    expect(pauseSubscriptionButton).toBeVisible()
  })

  describe('ship-now', () => {
    it('should open Confirmation Dialog when user clicks on ship-now button', async () => {
      const { user } = setup()

      const shipAnItemNowButton = screen.getByRole('button', {
        name: /ship-now/i,
      })

      // Act
      await user.click(shipAnItemNowButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('confirmation-dialog')
    })

    it('should Ship Item when user clicks on Confirm button', async () => {
      const { user } = setup()

      const shipAnItemNowButton = screen.getByRole('button', {
        name: /ship-now/i,
      })

      // Act
      await user.click(shipAnItemNowButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('ordered-successfully')
      expect(snackbar).toBeVisible()
    })
  })

  describe('skip-shipment', () => {
    it('should open Confirmation Dialog when user clicks on skip-shipment button', async () => {
      const { user } = setup()

      const skipShipmentButton = screen.getByRole('button', {
        name: /skip-shipment/i,
      })

      // Act
      await user.click(skipShipmentButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('confirmation-dialog')
    })

    it('should Skip Shipment when user clicks on Confirm button', async () => {
      const { user } = setup()

      const skipShipmentButton = screen.getByRole('button', {
        name: /skip-shipment/i,
      })

      // Act
      await user.click(skipShipmentButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const { nextOrderDate } = subscriptionGetters.getSubscriptionDetails(
        subscriptionMock.subscription
      )
      const snackbar = screen.getByText('next-order-skip' + nextOrderDate)
      expect(snackbar).toBeVisible()
    })
  })

  describe('cancel-subscription', () => {
    it('should open Confirmation Dialog when user clicks on cancel subscription button', async () => {
      const { user } = setup()

      const cancelSubscriptionButton = screen.getByRole('button', {
        name: /cancel-subscription/i,
      })

      // Act
      await user.click(cancelSubscriptionButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('confirmation-dialog')
    })

    it('should cancel subscription when user clicks on Confirm button', async () => {
      const { user } = setup()

      const cancelSubscriptionButton = screen.getByRole('button', {
        name: /cancel-subscription/i,
      })

      // Act
      await user.click(cancelSubscriptionButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('subscription-cancelled-successfully')
      expect(snackbar).toBeVisible()
    })
  })

  describe('pause-subscription', () => {
    it('should open Confirmation Dialog when user clicks on pause button', async () => {
      const { user } = setup()

      const pauseButton = screen.getByRole('button', {
        name: /pause-subscription/i,
      })

      // Act
      await user.click(pauseButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('confirmation-dialog')
    })

    it('should pause when user clicks on Confirm button', async () => {
      const { user } = setup()

      const pauseButton = screen.getByRole('button', {
        name: /pause-subscription/i,
      })

      // Act
      await user.click(pauseButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('subscription-paused')
      expect(snackbar).toBeVisible()
    })
  })

  describe('edit-subscription-frequency', () => {
    it('should open edit-subscription-frequency Dialog when user clicks on edit-frequency button', async () => {
      const { user } = setup()

      const editFrequencyButton = screen.getByRole('button', {
        name: /edit-frequency/i,
      })

      // Act
      await user.click(editFrequencyButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'edit-subscription-frequency-dialog'
      )
    })

    it('should save frequency when user clicks on Confirm button', async () => {
      const { user } = setup()

      const editFrequencyButton = screen.getByRole('button', {
        name: /edit-frequency/i,
      })

      // Act
      await user.click(editFrequencyButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('subscription-frequency-updated-successfully')
      expect(snackbar).toBeVisible()
    })

    it('should close dialog when user clicks on Close button', async () => {
      const { user } = setup()

      const editFrequencyButton = screen.getByRole('button', {
        name: /edit-frequency/i,
      })

      // Act
      await user.click(editFrequencyButton)

      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      // Assert
    })
  })

  describe('edit-order-date', () => {
    it('should open edit-order-date Dialog when user clicks on edit-order-date button', async () => {
      const { user } = setup()

      const editOrderDateButton = screen.getByRole('button', {
        name: /edit-order-date/i,
      })

      // Act
      await user.click(editOrderDateButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('edit-order-date-dialog')
    })

    it('should save Order Date when user clicks on Confirm button', async () => {
      const { user } = setup()

      const editOrderDateButton = screen.getByRole('button', {
        name: /edit-order-date/i,
      })

      // Act
      await user.click(editOrderDateButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('next-order-date01/01/2030')
      expect(snackbar).toBeVisible()
    })

    it('should close dialog when user clicks on Close button', async () => {
      const { user } = setup()

      const editOrderDateButton = screen.getByRole('button', {
        name: /edit-order-date/i,
      })

      // Act
      await user.click(editOrderDateButton)

      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      // Assert
    })
  })

  describe('edit-billing-information', () => {
    function getRegExp(card: any) {
      const starLength = (card.formattedAddress.match(/\*/g) || []).length
      const leftStr = card.formattedAddress.substr(0, starLength)
      const rightStr = card.formattedAddress.substr(card.formattedAddress.lastIndexOf('*') + 1)
      const str = `${leftStr}.*${rightStr.replace('  ', ' ')}`

      return new RegExp(str, 'i')
    }

    it('should open Popover when user clicks on edit-billing-information button', async () => {
      const { user } = setup()

      const editBillingInformationButton = screen.getByRole('button', {
        name: /edit-billing-information/i,
      })

      // Act
      await user.click(editBillingInformationButton)
      const addNewAddressButton = screen.getByRole('button', {
        name: /add-new-address/i,
      })

      // Assert
      const kiboSelectMock = screen.getByRole('button', { expanded: false })

      expect(kiboSelectMock).toBeVisible()
      expect(addNewAddressButton).toBeVisible()

      await user.click(kiboSelectMock)

      const cards: CardCollection = customerAccountCardsMock.customerAccountCards
      const contacts: CustomerContactCollection = userAddressMock.customerAccountContacts

      const savedCardsAndContacts = userGetters.getSavedCardsAndBillingDetails(cards, contacts)
      const savedCards = savedCardsAndContacts?.map((card: PaymentAndBilling) =>
        subscriptionGetters.getFormattedSavedCardBillingAddress('card-ending-in', card)
      )

      savedCards.forEach((card) => {
        const cardWithBillingAddress = screen.getByText(getRegExp(card))
        expect(cardWithBillingAddress).toBeVisible()
      })
    })

    it('should open address-form Dialog when user clicks on add-new-address button', async () => {
      const { user } = setup()

      const editBillingInformationButton = screen.getByRole('button', {
        name: /edit-billing-information/i,
      })

      // Act
      await user.click(editBillingInformationButton)
      const addNewAddressButton = screen.getByRole('button', {
        name: /add-new-address/i,
      })
      await user.click(addNewAddressButton)

      // Assert
      const editBillingAddress = screen.getByText('edit-billing-address-mock')
      expect(editBillingAddress).toBeVisible()
    })

    it('should save Billing Address when user enters new address and clicks on save button', async () => {
      const { user } = setup()

      const editBillingInformationButton = screen.getByRole('button', {
        name: /edit-billing-information/i,
      })

      // Act
      await user.click(editBillingInformationButton)

      const addNewAddressButton = screen.getByRole('button', { name: /add-new-address/i })
      await user.click(addNewAddressButton)

      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('address-updated-successfully')
      expect(snackbar).toBeVisible()
    })

    it('should save Billing Address when user selects existing Billing Address', async () => {
      const { user } = setup()

      const editBillingInformationButton = screen.getByRole('button', {
        name: /edit-billing-information/i,
      })

      // Act
      await user.click(editBillingInformationButton)

      const kiboSelectMock = screen.getByRole('button', { expanded: false })
      expect(kiboSelectMock).toBeVisible()
      await user.click(kiboSelectMock)

      const cards: CardCollection = customerAccountCardsMock.customerAccountCards
      const contacts: CustomerContactCollection = userAddressMock.customerAccountContacts

      const savedCardsAndContacts = userGetters.getSavedCardsAndBillingDetails(cards, contacts)
      const savedCards = savedCardsAndContacts?.map((card: PaymentAndBilling) =>
        subscriptionGetters.getFormattedSavedCardBillingAddress('card-ending-in', card)
      )

      const cardWithBillingAddress = screen.getByText(getRegExp(savedCards[0]))
      expect(cardWithBillingAddress).toBeVisible()
      await user.click(cardWithBillingAddress)

      // Assert
      const snackbar = screen.getByText('address-updated-successfully')
      expect(snackbar).toBeVisible()
    })
  })

  describe('edit-shipping-address', () => {
    it('should open Popover when user clicks on edit-shipping-address button', async () => {
      const { user } = setup()

      const editShippingAddressButton = screen.getByRole('button', {
        name: /edit-shipping-address/i,
      })

      // Act
      await user.click(editShippingAddressButton)
      const addNewAddressButton = screen.getByRole('button', {
        name: /add-new-address/i,
      })

      // Assert
      const kiboSelectMock = screen.getByRole('button', { expanded: false })
      expect(kiboSelectMock).toBeVisible()
      expect(addNewAddressButton).toBeVisible()

      await user.click(kiboSelectMock)

      Common.args?.fulfillmentInfoList?.map((fulfillmentInfo) => {
        const fulfillmentOption = screen.getByRole('option', {
          name: new RegExp(String(fulfillmentInfo.formattedAddress)),
        })

        expect(fulfillmentOption).toBeVisible()
      })
    })

    it('should open address-form Dialog when user clicks on add-new-address button', async () => {
      const { user } = setup()

      const editShippingAddressButton = screen.getByRole('button', {
        name: /edit-shipping-address/i,
      })

      // Act
      await user.click(editShippingAddressButton)

      const addNewAddressButton = screen.getByRole('button', {
        name: /add-new-address/i,
      })
      expect(addNewAddressButton).toBeVisible()
      await user.click(addNewAddressButton)

      // Assert
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('address-form-dialog')
    })

    it('should save Shipping Address when user enters new address and clicks on save button', async () => {
      const { user } = setup()

      const editShippingAddressButton = screen.getByRole('button', {
        name: /edit-shipping-address/i,
      })

      // Act
      await user.click(editShippingAddressButton)

      const addNewAddressButton = screen.getByRole('button', {
        name: /add-new-address/i,
      })
      expect(addNewAddressButton).toBeVisible()

      await user.click(addNewAddressButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('address-updated-successfully')
      expect(snackbar).toBeVisible()
    })

    it('should save Shipping Address when user selects existing Shipping Address', async () => {
      const { user } = setup()

      const editShippingAddressButton = screen.getByRole('button', {
        name: /edit-shipping-address/i,
      })

      // Act
      await user.click(editShippingAddressButton)

      const kiboSelectMock = screen.getByRole('button', { expanded: false })
      await user.click(kiboSelectMock)

      const formattedAddress =
        Common.args &&
        Common.args?.fulfillmentInfoList &&
        Common.args?.fulfillmentInfoList[1] &&
        Common.args.fulfillmentInfoList[1]?.formattedAddress

      const fulfillmentOption = screen.getByRole('option', {
        name: new RegExp(String(formattedAddress)),
      })

      await user.click(fulfillmentOption)

      // Assert
      const snackbar = screen.getByText('address-updated-successfully')
      expect(snackbar).toBeVisible()
    })
  })
})
