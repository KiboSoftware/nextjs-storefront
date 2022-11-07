import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'

import * as stories from './SavedPaymentMethodView.stories' // import all stories from the stories file

const { Common, Radio } = composeStories(stories)

const PaymentCardDetailsViewMock = () => <div data-testid="payment-card-details-mock" />
jest.mock(
  '@/components/checkout/PaymentCardDetailsView/PaymentCardDetailsView',
  () => () => PaymentCardDetailsViewMock()
)

const AddressDetailsViewMock = () => <div data-testid="address-details-view-mock" />
jest.mock(
  '@/components/common/AddressDetailsView/AddressDetailsView',
  () => () => AddressDetailsViewMock()
)

describe('[component] - SavedPaymentMethodView', () => {
  it('should render the component', () => {
    render(<Common {...Common.args} />)

    expect(screen.getByTestId('payment-card-details-mock')).toBeVisible()
    expect(screen.getByTestId('address-details-view-mock')).toBeVisible()
  })

  it('should render radio button if radio prop is true', async () => {
    render(<Radio {...Radio.args} />)
    const radio = screen.getByRole('radio', { name: 'payment-billing-view' })
    await waitFor(() => {
      expect(radio).toBeInTheDocument()
    })
  })
})
