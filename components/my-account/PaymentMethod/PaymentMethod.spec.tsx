import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './PaymentMethod.stories'

const { Common, NoSavedCards } = composeStories(stories)

window.scrollTo = jest.fn()

const PaymentBillingCardMock = () => <div data-testid="payment-billing-card" />
jest.mock(
  '@/components/common/PaymentBillingCard/PaymentBillingCard',
  () => () => PaymentBillingCardMock()
)
const CardDetailsFormMock = () => <div data-testid="card-details-form" />
jest.mock(
  '@/components/checkout/CardDetailsForm/CardDetailsForm',
  () => () => CardDetailsFormMock()
)

const AddressFormMock = () => <div data-testid="address-form" />
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())

const AddressDetailsViewMock = () => <div data-testid="address-details-view" />
jest.mock('@/components/common/AddressCard/AddressCard', () => () => AddressDetailsViewMock())

jest.mock('@/lib/helpers/hasPermission', () => ({
  hasPermission: jest.fn().mockImplementation(() => true),
}))
const user = userEvent.setup()

describe('[component] - PaymentMethod (has saved payment methods)', () => {
  it('should render already saved payment details ', () => {
    render(<Common {...Common.args} />)

    expect(screen.getAllByTestId('payment-billing-card')).toHaveLength(
      Common.args?.cards?.items?.length as number
    )
  })

  it(`should render cardDetailsForm if 'Add Payment Method' button is clicked`, async () => {
    render(<Common {...Common.args} />)

    const savedPaymentMethods = screen.getByTestId('payment-billing-card')

    user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    await waitFor(() => {
      expect(savedPaymentMethods).not.toBeVisible()
    })

    expect(screen.getByTestId('card-details-form')).toBeVisible()
  })

  it(`should render cardDetailsForm if 'Edit' is clicked`, async () => {
    render(<Common {...Common.args} />)

    const savedPaymentMethods = screen.getByTestId('payment-billing-card')

    user.click(screen.getByTestId('payment-method-edit-link'))
    await waitFor(() => {
      expect(savedPaymentMethods).not.toBeVisible()
    })
    expect(screen.getByTestId('card-details-form')).toBeVisible()
  })

  it(`should render saved billing address radios if contacts are available`, async () => {
    render(<Common {...Common.args} />)

    user.click(screen.getByRole('button', { name: 'add-payment-method' }))
    await waitFor(() => {
      expect(screen.getByTestId('address-details-view')).toBeVisible()
    })
  })

  it(`should render  address form if 'Add new address' button is clicked`, async () => {
    render(<Common {...Common.args} />)

    user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    await waitFor(() => {
      user.click(screen.getByRole('button', { name: 'add-new-address' }))
    })

    await waitFor(() => {
      expect(screen.getByTestId('address-form')).toBeVisible()
    })
  })
})

describe('[component] - PaymentMethod (no saved payment methods and billing address)', () => {
  it('should not render already saved payment details', () => {
    render(<NoSavedCards {...NoSavedCards.args} />)

    expect(screen.queryByTestId('payment-billing-card')).not.toBeInTheDocument()
    expect(screen.getByText('no-saved-payments-yet')).toBeVisible()
  })

  it(`should render cardDetailsForm and address form if 'Add Payment Method' button is clicked`, async () => {
    render(<NoSavedCards {...NoSavedCards.args} />)

    const savedPaymentMethods = screen.queryByTestId('payment-billing-card')

    user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    await waitFor(() => {
      expect(savedPaymentMethods).not.toBeInTheDocument()
    })

    await waitFor(() => {
      expect(screen.getByTestId('card-details-form')).toBeVisible()
    })
    await waitFor(() => {
      expect(screen.getByTestId('address-form')).toBeVisible()
    })
  })
})
