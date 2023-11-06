import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderPrice.stories' // import all stories from the stories file

import { CrOrder } from '@/lib/gql/types'

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options?: { val: number | string }) =>
      key === 'currency' ? `${options?.val}` : key,
  }),
}))

const { Common, WithPromoCode } = composeStories(stories)
const PromoCodeBadgeMock = () => <div data-testid="promo-code-badge-component" />
jest.mock('@/components/common/PromoCodeBadge/PromoCodeBadge', () => () => PromoCodeBadgeMock())

describe('[components] OrderPrice', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(Common.args?.handlingLabel as string)).toBeVisible()
    expect(screen.getByText(Common.args?.orderDetails?.handlingTotal as number)).toBeVisible()
    expect(screen.getByText(Common.args?.shippingTotalLabel as string)).toBeVisible()
    expect(screen.getAllByText(Common.args?.orderDetails?.shippingTotal as number)[0]).toBeVisible()
    expect(screen.getByText(Common.args?.totalLabel as string)).toBeVisible()
    expect(screen.getByText(Common.args?.orderDetails?.total as number)).toBeVisible()
  })
  it('should show promoCodeBadge component when supplied', async () => {
    render(<WithPromoCode {...WithPromoCode.args} />)
    expect(screen.getByTestId('promo-code-badge-component')).toBeVisible()
  })
})
