/* eslint-disable @typescript-eslint/no-var-requires */
import { screen, waitFor } from '@testing-library/react'

import '@testing-library/jest-dom'
import CheckoutHeader from './CheckoutHeader'
import { renderWithQueryClient } from '@/__test__/utils'

describe('[component] MobileHeader component', () => {
  it('should render the component', async () => {
    renderWithQueryClient(<CheckoutHeader isMultiShipEnabled />)

    await waitFor(() => {
      expect(screen.getByText(/checkout/)).toBeVisible()
    })

    expect(screen.queryByTestId(/top-bar/)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/header-action-area/)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/mega-menu-container/)).not.toBeInTheDocument()
    expect(screen.getByAltText('kibo-logo')).toBeVisible()
  })
})
