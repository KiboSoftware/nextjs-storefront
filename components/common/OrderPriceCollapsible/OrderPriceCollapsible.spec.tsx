import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from './OrderPriceCollapsible.stories' // import all stories from the stories file

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    i18n: { language: 'en' },
    t: (key: string, options?: { val: number | string }) =>
      key === 'currency' ? `${options?.val}` : key,
  }),
}))

const { Common, WithDiscounts } = composeStories(stories)
const user = userEvent.setup()

describe('[components] OrderPriceCollapsible', () => {
  it('should render component', async () => {
    render(<Common {...Common.args} />)
    const total = (WithDiscounts.args?.total as number) + (Common.args?.taxTotal ?? 0)
    const accordionButton = screen.getByRole('button', {
      name: `${Common.args?.title as string} ${total}`,
    })

    expect(accordionButton).toBeVisible()

    await user.click(accordionButton)
    expect(screen.getByText(Common.args?.title as string)).toBeVisible()
    expect(screen.getByText(total)).toBeVisible()
    expect(screen.getByText(Common.args?.subTotal as number)).toBeVisible()
    expect(screen.getByText(Common.args?.taxTotal as number)).toBeVisible()
  })

  it('should render component with discount', async () => {
    render(<WithDiscounts {...WithDiscounts.args} />)
    const total = (WithDiscounts.args?.total as number) + (Common.args?.taxTotal ?? 0)
    const accordionButton = screen.getByRole('button', {
      name: `${WithDiscounts.args?.title as string} ${total}`,
    })

    expect(accordionButton).toBeVisible()

    await user.click(accordionButton)
    expect(screen.getByText(WithDiscounts.args?.title as string)).toBeVisible()
    expect(screen.getByText(total)).toBeVisible()
    expect(screen.getByText(WithDiscounts.args?.discountedSubtotal as number)).toBeVisible()
    expect(screen.getByText(WithDiscounts.args?.discounts?.[0].name as number)).toBeVisible()
    expect(screen.getByText(WithDiscounts.args?.discounts?.[0].impact as number)).toBeVisible()
    expect(screen.getByText(WithDiscounts.args?.taxTotal as number)).toBeVisible()
  })
})
