import React from 'react'

import { composeStories } from '@storybook/testing-react'
import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterContext } from 'next/dist/shared/lib/router-context'

import { createMockRouter } from '@/__test__/utils/createMockRouter'
import { renderWithQueryClient } from '@/__test__/utils/renderWithQueryClient'
import * as stories from '@/components/page-templates/CartTemplate/CartTemplate.stories'

const { Common } = composeStories(stories)

const setup = (params) => {
  const user = userEvent.setup()
  const router = createMockRouter()

  renderWithQueryClient(
    <RouterContext.Provider value={router}>
      <Common {...params} />
    </RouterContext.Provider>
  )
  return {
    user,
    router,
  }
}

afterEach(() => {
  cleanup()
})

describe('[components] CartTemplate integration', () => {
  it('should render component', async () => {
    const props = { ...Common.args }
    setup(props)

    const cartTitle = screen.getByText(/cart:shopping-cart/i)
    const cartItemCount = screen.getByText(/cart:cart-item-count/i)
    const orderSummaryHeading = screen.getByText('order-summary')

    const gotToCheckout = screen.getByRole('button', {
      name: /go-to-checkout/i,
    })
    expect(cartTitle).toBeVisible()
    expect(cartItemCount).toBeVisible()
    expect(orderSummaryHeading).toBeVisible()

    expect(gotToCheckout).toBeVisible()
    expect(gotToCheckout).toBeEnabled()
  })
})
