import React, { ReactNode } from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './StandardShipCheckoutTemplate.stories'

const { Common } = composeStories(stories)

jest.mock('@/components/page-templates/CheckoutUITemplate/CheckoutUITemplate', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => (
    <div data-testid="checkout-ui-template-mock">{children}</div>
  ),
}))

const DetailsStepMock = () => <div data-testid="details-step-mock" />
jest.mock('@/components/checkout/DetailsStep/DetailsStep', () => () => DetailsStepMock())

const MultiShippingStepMock = () => <div data-testid="multi-shipping-step-mock" />
jest.mock(
  '@/components/checkout/MultiShippingStep/MultiShippingStep',
  () => () => MultiShippingStepMock()
)

describe('[component] - StandardShipCheckout template', () => {
  it('should render component', async () => {
    render(<Common {...Common?.args} />)
    const checkoutUITemplate = screen.getByTestId('checkout-ui-template-mock')
    expect(checkoutUITemplate).toBeVisible()

    const detailsStep = screen.getByTestId('details-step-mock')
    expect(detailsStep).toBeVisible()

    const multiShippingStep = screen.getByTestId('multi-shipping-step-mock')
    expect(multiShippingStep).toBeVisible()
  })
})
