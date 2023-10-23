import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'

import * as stories from './OrderPriceCollapsible.stories' // import all stories from the stories file

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options?: { val: number | string }) =>
      key === 'currency' ? `${options?.val}` : key,
  }),
}))

const { Common } = composeStories(stories)
const PromoCodeBadgeMock = () => <div data-testid="promo-code-badge-component" />
jest.mock('@/components/common/PromoCodeBadge/PromoCodeBadge', () => () => PromoCodeBadgeMock())

describe('[components] OrderPrice', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)

    expect(screen.getByText(Common.args?.title as string)).toBeVisible()
    expect(screen.getByText(Common.args?.total as number)).toBeVisible()
    expect(screen.getByText(Common.args?.subTotal as number)).toBeVisible()
    expect(screen.getByText(Common.args?.taxTotal as number)).toBeVisible()
  })
})
