/* eslint-disable @typescript-eslint/no-var-requires */
import { screen } from '@testing-library/react'

import '@testing-library/jest-dom'
import CheckoutHeader from './CheckoutHeader'
import { renderWithQueryClient } from '@/__test__/utils'

const useRouter = jest.spyOn(require('next/router'), 'useRouter')
const push = jest.fn()
useRouter.mockImplementation(() => ({
  push,
  pathname: '/checkout',
  query: {
    checkoutId: '137a979305c65d00010800230000678b',
  },
}))

describe('[component] MobileHeader component', () => {
  it('should render the component', () => {
    renderWithQueryClient(<CheckoutHeader numberOfItems={3} />)

    expect(screen.getByText(/checkout/)).toBeVisible()
    expect(screen.queryByTestId(/top-bar/)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/header-action-area/)).not.toBeInTheDocument()
    expect(screen.queryByTestId(/mega-menu-container/)).not.toBeInTheDocument()
    expect(screen.getByAltText('kibo-logo')).toBeVisible()
  })
})
