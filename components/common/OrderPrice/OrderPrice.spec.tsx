import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderPrice.stories' // import all stories from the stories file

const { Common, WithPromoCode } = composeStories(stories)
const PromoCodeBadgeMock = () => <div data-testid="promo-code-badge-component" />
jest.mock('@/components/common/PromoCodeBadge/PromoCodeBadge', () => () => PromoCodeBadgeMock())

describe('[components] OrderPrice', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(Common.args?.subTotal as string)).toBeVisible()
    expect(screen.getByText(Common.args?.shippingTotalLabel as string)).toBeVisible()
    expect(screen.getByText(Common.args?.shippingTotal as string)).toBeVisible()
    expect(screen.getByText(Common.args?.taxLabel as string)).toBeVisible()
    expect(screen.getByText(Common.args?.tax as string)).toBeVisible()
    expect(screen.getByText(Common.args?.totalLabel as string)).toBeVisible()
    expect(screen.getByText(Common.args?.total as string)).toBeVisible()
  })
  it('should show promoCodeBadge component when supplied', async () => {
    render(<WithPromoCode {...WithPromoCode.args} />)
    expect(screen.getByTestId('promo-code-badge-component')).toBeVisible()
  })
})
