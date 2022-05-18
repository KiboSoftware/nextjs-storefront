import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import { useTranslation } from 'next-i18next'

import * as stories from './SavedPaymentMethodView.stories' // import all stories from the stories file

const { Common } = composeStories(stories)

const PaymentCardDetailsViewMock = () => <div data-testid="payment-card-details-mock" />
jest.mock(
  '@/components/checkout/PaymentCardDetailsView/PaymentCardDetailsView',
  () => PaymentCardDetailsViewMock
)

const AddressDetailsViewMock = () => <div data-testid="address-details-view-mock" />
jest.mock(
  '@/components/checkout/AddressDetailsView/AddressDetailsView',
  () => AddressDetailsViewMock
)

describe('[component] - SavedPaymentMethodView', () => {
  it('should render the component', () => {
    const { t } = useTranslation('checkout')

    render(<Common {...Common.args} />)

    expect(screen.getByTestId('payment-card-details-mock')).toBeVisible()
    expect(screen.getByTestId('address-details-view-mock')).toBeVisible()
    expect(screen.getByText(t('payment-information'))).toBeVisible()
  })
})
