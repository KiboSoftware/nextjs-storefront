import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './PaymentMethod.stories'

const { Common, NoSavedCards } = composeStories(stories)

const SavedPaymentMethodViewMock = () => <div data-testid="saved-payment-method-view" />
jest.mock(
  '@/components/checkout/SavedPaymentMethodView/SavedPaymentMethodView',
  () => () => SavedPaymentMethodViewMock()
)
const CardDetailsFormMock = () => <div data-testid="card-details-form" />
jest.mock(
  '@/components/checkout/CardDetailsForm/CardDetailsForm',
  () => () => CardDetailsFormMock()
)

const AddressFormMock = () => <div data-testid="address-form" />
jest.mock('@/components/common/AddressForm/AddressForm', () => () => AddressFormMock())

const AddressDetailsViewMock = () => <div data-testid="address-details-view" />
jest.mock(
  '@/components/common/AddressDetailsView/AddressDetailsView',
  () => () => AddressDetailsViewMock()
)

const user = userEvent.setup()

describe('[component] - PaymentMethod (has saved payment methods)', () => {
  it('should render already saved payment details ', () => {
    render(<Common {...Common.args} />)

    expect(screen.getAllByTestId('saved-payment-method-view')).toHaveLength(
      Common.args?.cards?.items?.length as number
    )
  })

  it(`should render cardDetailsForm if 'Add Payment Method' button is clicked`, async () => {
    render(<Common {...Common.args} />)

    const savedPaymentMethods = screen.getByTestId('saved-payment-method-view')

    await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    expect(savedPaymentMethods).not.toBeVisible()
    expect(screen.getByTestId('card-details-form')).toBeVisible()
  })

  it(`should render cardDetailsForm if 'Edit' is clicked`, async () => {
    render(<Common {...Common.args} />)

    const savedPaymentMethods = screen.getByTestId('saved-payment-method-view')

    await user.click(screen.getByTestId('payment-method-edit-link'))

    expect(savedPaymentMethods).not.toBeVisible()
    expect(screen.getByTestId('card-details-form')).toBeVisible()
  })

  it(`should render saved billing address radios if contacts are available`, async () => {
    render(<Common {...Common.args} />)

    await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    expect(screen.getByTestId('address-details-view')).toBeVisible()
  })

  it(`should render  address form if 'Add new address' button is clicked`, async () => {
    render(<Common {...Common.args} />)

    await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    await user.click(screen.getByRole('button', { name: 'add-new-address' }))

    expect(screen.getByTestId('address-form')).toBeVisible()
  })
})

describe('[component] - PaymentMethod (no saved payment methods and billing address)', () => {
  it('should not render already saved payment details', () => {
    render(<NoSavedCards {...NoSavedCards.args} />)

    expect(screen.queryByTestId('saved-payment-method-view')).not.toBeInTheDocument()
    expect(screen.getByText('no-saved-addresses-yet')).toBeVisible()
  })

  it(`should render cardDetailsForm and address form if 'Add Payment Method' button is clicked`, async () => {
    render(<NoSavedCards {...NoSavedCards.args} />)

    const savedPaymentMethods = screen.queryByTestId('saved-payment-method-view')

    await user.click(screen.getByRole('button', { name: 'add-payment-method' }))

    expect(savedPaymentMethods).not.toBeInTheDocument()
    expect(screen.getByTestId('card-details-form')).toBeVisible()
    expect(screen.getByTestId('address-form')).toBeVisible()
  })
})
