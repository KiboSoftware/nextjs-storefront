import React from 'react'

import '@testing-library/jest-dom'
import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './SubscriptionItem.stories'
import { subscriptionItemMock } from '@/__mocks__/stories'
import { createQueryClientWrapper } from '@/__test__/utils'
import { subscriptionGetters } from '@/lib/getters'
import type { Address } from '@/lib/types'

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
}))

// Clear all mocks
afterEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

describe('[component] - SubscriptionItem', () => {
  const setup = () => {
    const user = userEvent.setup()
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
      name: /ship-an-item-now/i,
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
      name: /cancel-an-item/i,
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

  describe('ship-an-item-now', () => {
    it('should open Confirmation Dialog when user clicks on ship-an-item-now button', async () => {
      const { user } = setup()

      const shipAnItemNowButton = screen.getByRole('button', {
        name: /ship-an-item-now/i,
      })

      // Act
      await user.click(shipAnItemNowButton)

      // Assert
      // expect(screen.getByRole('dialog')).toBeVisible()
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('confirmation-dialog')
    })

    it('should Ship Item when user clicks on Confirm button', async () => {
      const { user } = setup()

      const shipAnItemNowButton = screen.getByRole('button', {
        name: /ship-an-item-now/i,
      })

      // Act
      await user.click(shipAnItemNowButton)
      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      // expect(screen.getByRole('dialog')).toBeVisible()
      const snackbar = screen.getByText('item-ordered-successfully')
      expect(snackbar).toBeVisible()
    })

    it('should close dialog when user clicks on Close button', async () => {
      const { user } = setup()

      const shipAnItemNowButton = screen.getByRole('button', {
        name: /ship-an-item-now/i,
      })

      // Act
      await user.click(shipAnItemNowButton)
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      // Assert
      // Verify that dialog is not visible
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
      // expect(screen.getByRole('dialog')).toBeVisible()
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
      // expect(screen.getByRole('dialog')).toBeVisible()
      const snackbar = screen.getByText('item-ordered-successfully')
      expect(snackbar).toBeVisible()
    })

    it('should close dialog when user clicks on Close button', async () => {
      const { user } = setup()

      const skipShipmentButton = screen.getByRole('button', {
        name: /skip-shipment/i,
      })

      // Act
      await user.click(skipShipmentButton)
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)

      // Assert
      // Verify that dialog is not visible
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
      //expect(screen.getByRole('dialog')).toBeVisible()
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
      //expect(screen.getByRole('dialog')).toBeVisible()
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
      // Verify that dialog is not visible
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
      //expect(screen.getByRole('dialog')).toBeVisible()
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
      // Verify that dialog is not visible
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
      expect(addNewAddressButton).toBeVisible()
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
      //expect(screen.getByRole('dialog')).toBeVisible()
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

      //expect(screen.getByRole('dialog')).toBeVisible()
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('address-form-dialog')

      const confirmButton = screen.getByRole('button', { name: /confirm/i })
      await user.click(confirmButton)

      // Assert
      const snackbar = screen.getByText('address-updated-successfully')
      expect(snackbar).toBeVisible()
    })

    // it('should save Shipping Address when user selects existing Shipping Address', async () => {})
  })
})
