import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import * as stories from '@/components/checkout/ShippingStep/ShippingStep.stories'

const { Common } = composeStories(stories)
const scrollIntoViewMock = jest.fn()
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

describe('[components] ShippingStep', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<Common {...Common.args} />)
    return {
      user,
    }
  }

  it('should render component', () => {
    setup()

    const shippingHeading = screen.getByRole('heading', {
      name: 'shipping',
    })

    const saveShippingAddressButton = screen.getByRole('button', {
      name: /save-shipping-address/i,
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first-name/i,
    })
    const addressCard = screen.getAllByTestId('address-card')
    const heading = screen.getByText('common:your-default-shipping-address')
    const addressCount = Common?.args?.userShippingAddress?.length as number

    expect(shippingHeading).toBeVisible()
    expect(saveShippingAddressButton).toBeVisible()
    expect(firstNameInput).toBeVisible()
    expect(heading).toBeVisible()
    expect(addressCard[0]).toBeVisible()
    expect(addressCard).toHaveLength(addressCount)
  })

  it('should handle previously save address selection', async () => {
    const { user } = setup()
    const radio = screen.getAllByRole('radio')

    await user.click(radio[0])
    expect(radio[0]).toBeChecked()
  })
})
