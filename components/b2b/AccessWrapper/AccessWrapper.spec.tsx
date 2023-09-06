import React from 'react'

import { render, screen } from '@testing-library/react'

import AccessWrapper from './AccessWrapper' // Update the path to your component
import { AuthContext } from '@/context' // Import your AuthContext implementation
import { B2BRoles, QuoteStatus } from '@/lib/constants'

const userMock = {
  id: 0,
  roleName: 'Admin',
}

jest.mock('@/context/AuthContext', () => ({
  useAuthContext: () => {
    return {
      user: userMock,
    }
  },
}))

beforeEach(() => {
  userMock.roleName = B2BRoles.ADMIN
})

const renderQuoteAction = ({ name, status }: { name: string; status: string }) => {
  render(
    <AccessWrapper name={name} quoteStatus={status}>
      <button>{name}</button>
    </AccessWrapper>
  )
}

describe('AccessWrapper Component', () => {
  it('should handle QuoteAddShippingAddressButton with Admin role', () => {
    render(
      <AccessWrapper name="QuoteAddShippingAddress">
        <button>QuoteAddShippingAddress</button>
      </AccessWrapper>
    )

    // Assert that the child component is rendered
    expect(screen.getByRole('button', { name: 'QuoteAddShippingAddress' })).toBeInTheDocument()
  })

  it('should handle deleteQuote with Admin and Purchaser role', () => {
    const { rerender } = render(
      <AccessWrapper name="DeleteQuote">
        <button>DeleteQuote</button>
      </AccessWrapper>
    )

    // Assert that the child component is rendered
    expect(screen.getByRole('button', { name: 'DeleteQuote' })).toBeInTheDocument()

    userMock.roleName = B2BRoles.PURCHASER

    rerender(
      <AccessWrapper name="DeleteQuote">
        <button>DeleteQuote</button>
      </AccessWrapper>
    )

    expect(screen.getByRole('button', { name: 'DeleteQuote' })).toBeInTheDocument()

    userMock.roleName = B2BRoles.NON_PURCHASER

    rerender(
      <AccessWrapper name="DeleteQuote">
        <button>DeleteQuote</button>
      </AccessWrapper>
    )

    expect(screen.queryByRole('button', { name: 'DeleteQuote' })).not.toBeInTheDocument()
  })

  // Edit Quote
  it('should handle editQuote with Admin role with supported statuses', () => {
    const supportedStatuses = [QuoteStatus.Pending, QuoteStatus.ReadyForCheckout]

    supportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EditQuote',
        status,
      })
    })

    expect(screen.getAllByRole('button', { name: 'EditQuote' }).length).toBe(
      supportedStatuses.length
    )
  })

  it('should handle editQuote with Admin role with non supported statuses', () => {
    const nonSupportedStatuses = [QuoteStatus.InReview, QuoteStatus.Completed, QuoteStatus.Expired]

    nonSupportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EditQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EditQuote' })).not.toBeInTheDocument()
    })
  })

  it('should handle editQuote with Purchaser role with supported statuses', () => {
    userMock.roleName = B2BRoles.PURCHASER

    const supportedStatuses = [QuoteStatus.Pending, QuoteStatus.ReadyForCheckout]

    supportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EditQuote',
        status,
      })
    })

    expect(screen.getAllByRole('button', { name: 'EditQuote' }).length).toBe(
      supportedStatuses.length
    )
  })

  it('should handle editQuote with Purchaser role with non supported statuses', () => {
    userMock.roleName = B2BRoles.PURCHASER

    const nonSupportedStatuses = [QuoteStatus.InReview, QuoteStatus.Completed, QuoteStatus.Expired]

    nonSupportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EditQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EditQuote' })).not.toBeInTheDocument()
    })
  })

  it('should not render edit option with Non Purchaser role', () => {
    userMock.roleName = B2BRoles.NON_PURCHASER

    const allStatuses = [
      QuoteStatus.Pending,
      QuoteStatus.InReview,
      QuoteStatus.ReadyForCheckout,
      QuoteStatus.Expired,
      QuoteStatus.Completed,
    ]

    allStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EditQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EditQuote' })).not.toBeInTheDocument()
    })
  })

  // Email Quote
  it('should handle emailQuote with Admin role with supported statuses', () => {
    const supportedStatuses = [
      QuoteStatus.Pending,
      QuoteStatus.InReview,
      QuoteStatus.ReadyForCheckout,
      QuoteStatus.Expired,
    ]

    supportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EmailQuote',
        status,
      })
    })

    expect(screen.getAllByRole('button', { name: 'EmailQuote' }).length).toBe(
      supportedStatuses.length
    )
  })

  it('should handle emailQuote with Admin role with non supported statuses', () => {
    const nonSupportedStatuses = [QuoteStatus.Completed]

    nonSupportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EmailQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EmailQuote' })).not.toBeInTheDocument()
    })
  })

  it('should handle emailQuote with Purchaser role with supported statuses', () => {
    userMock.roleName = B2BRoles.PURCHASER
    const supportedStatuses = [
      QuoteStatus.Pending,
      QuoteStatus.InReview,
      QuoteStatus.ReadyForCheckout,
      QuoteStatus.Expired,
    ]

    supportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EmailQuote',
        status,
      })
    })

    expect(screen.getAllByRole('button', { name: 'EmailQuote' }).length).toBe(
      supportedStatuses.length
    )
  })

  it('should handle emailQuote with Purchaser role with non supported statuses', () => {
    userMock.roleName = B2BRoles.PURCHASER
    const nonSupportedStatuses = [QuoteStatus.Completed]

    nonSupportedStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EmailQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EmailQuote' })).not.toBeInTheDocument()
    })
  })

  it('should not render email option with Non Purchaser role', () => {
    userMock.roleName = B2BRoles.NON_PURCHASER
    const allStatuses = [
      QuoteStatus.Pending,
      QuoteStatus.InReview,
      QuoteStatus.ReadyForCheckout,
      QuoteStatus.Expired,
      QuoteStatus.Completed,
    ]

    allStatuses.forEach((status) => {
      renderQuoteAction({
        name: 'EmailQuote',
        status,
      })

      expect(screen.queryByRole('button', { name: 'EmailQuote' })).not.toBeInTheDocument()
    })
  })

  it('should render AddChildAccountButton with Admin role', () => {
    render(
      <AccessWrapper name="AddChildAccount">
        <button>AddChildAccount</button>
      </AccessWrapper>
    )

    // Assert that the child component is rendered
    expect(screen.getByRole('button', { name: 'AddChildAccount' })).toBeInTheDocument()
  })

  it('should not render AddChildAccountButton with Purchaser or Nonpurchaser role', () => {
    render(
      <AccessWrapper name="AddChildAccount" b2BUserRole={B2BRoles.PURCHASER}>
        <button>AddChildAccount</button>
      </AccessWrapper>
    )

    // Assert that the child component is not rendered
    expect(screen.queryByRole('button', { name: 'AddChildAccount' })).not.toBeInTheDocument()
  })
})
