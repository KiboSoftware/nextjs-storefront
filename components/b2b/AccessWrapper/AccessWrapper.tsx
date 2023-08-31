import React from 'react'

import { useAuthContext } from '@/context'
import { B2BRoles, QuoteStatus } from '@/lib/constants'

const handleEditQuoteAccess = (role: string, quoteStatus?: string) => {
  return (
    (role === B2BRoles.ADMIN || role === B2BRoles.PURCHASER) &&
    (quoteStatus === QuoteStatus.Pending || quoteStatus === QuoteStatus.ReadyForCheckout)
  )
}

const handleEmailQuoteAccess = (role: string, quoteStatus?: string) => {
  return (
    (role === B2BRoles.ADMIN || role === B2BRoles.PURCHASER) &&
    (quoteStatus === QuoteStatus.Pending ||
      quoteStatus === QuoteStatus.InReview ||
      quoteStatus === QuoteStatus.ReadyForCheckout ||
      quoteStatus === QuoteStatus.Expired)
  )
}

const AccessManager: any = (role: string, quoteStatus?: string, quoteMode?: string) => {
  return {
    QuoteAddShippingAddress: role === B2BRoles.ADMIN,
    DeleteQuote: role === B2BRoles.ADMIN || role === B2BRoles.PURCHASER,
    EditQuote: handleEditQuoteAccess(role, quoteStatus),
    EmailQuote: handleEmailQuoteAccess(role, quoteStatus),
  }
}

interface AccessWrapperProps {
  name: string
  quoteStatus?: string
  quoteMode?: string
  children: any
}

// wrap it around any Node that needs to be conditionally rendered based on user role, quote status, or quote mode
const AccessWrapper = (props: AccessWrapperProps) => {
  const { name, quoteStatus, quoteMode } = props
  const { user } = useAuthContext()
  const shouldShow = AccessManager(user?.roleName, quoteStatus, quoteMode)[name]

  return shouldShow ? props.children : null
}

export default AccessWrapper
