import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { orderMock } from '@/__mocks__/stories'
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

  it('should handle previously save address selection', async () => {
    const { user } = setup()

    const defaultAddress = screen.getByRole('heading', {
      name: /your-default-shipping-address/i,
    })
    const savedAddress = screen.getByRole('heading', {
      name: /previously-saved-shipping-addresses/i,
    })
    const addShippingAddressButton = screen.getByRole('button', {
      name: /add-new-address/i,
    })
    const addressCard = screen.getAllByTestId('address-card')

    expect(defaultAddress).toBeVisible()
    expect(savedAddress).toBeVisible()
    expect(addShippingAddressButton).toBeVisible()
    expect(addressCard[0]).toBeVisible()

    const radio = screen.getAllByRole('radio')
    await user.click(radio[0])
    expect(radio[0]).toBeChecked()
    await waitFor(() => {
      expect(screen.getByText(/shipping-method/i)).toBeVisible()
    })
  })

  it('should handle add new address', async () => {
    render(
      <Common
        {...Common.args}
        userShippingAddress={undefined}
        checkout={{
          ...orderMock.checkout,
          fulfillmentInfo: { ...orderMock.checkout.fulfillmentInfo, fulfillmentContact: null },
        }}
      />
    )

    const saveShippingAddressButton = screen.getByRole('button', {
      name: /save-shipping-address/i,
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first-name/i,
    })

    expect(saveShippingAddressButton).toBeVisible()
    expect(firstNameInput).toBeVisible()
  })
})
