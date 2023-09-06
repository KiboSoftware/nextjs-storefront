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

const AccessManager: any = (
  role: string,
  quoteStatus?: string,
  quoteMode?: string,
  hasDraft?: string
) => {
  return {
    QuoteAddShippingAddress: role === B2BRoles.ADMIN,
    DeleteQuote: role === B2BRoles.ADMIN || role === B2BRoles.PURCHASER,
    EditQuote: handleEditQuoteAccess(role, quoteStatus),
    EmailQuote: handleEmailQuoteAccess(role, quoteStatus),
    QuoteClearChanges: quoteMode === 'create' || quoteMode === 'edit',
    QuoteSubmitForApproval: quoteStatus !== QuoteStatus.ReadyForCheckout || quoteMode === 'edit',
    QuoteContinueToCheckout: quoteStatus === QuoteStatus.ReadyForCheckout,
    EditQuoteButton: !quoteMode,
    QuoteSubmitForApprovalForMobile: quoteStatus !== QuoteStatus.ReadyForCheckout || hasDraft,
    QuoteContinueToCheckoutForMobile: quoteStatus === QuoteStatus.ReadyForCheckout && !hasDraft,
    B2BProductSearch: quoteMode && quoteStatus !== QuoteStatus.InReview,
    ShippingMethodReadOnly:
      !quoteMode || quoteStatus === QuoteStatus.InReview || role === B2BRoles.NON_PURCHASER,
    CreateQuoteButton: role !== B2BRoles.NON_PURCHASER,
    AddComment: quoteMode && quoteStatus !== QuoteStatus.InReview,
    AddChildAccount: role === B2BRoles.ADMIN,
    ViewAccountHierarchyBuyersAndQuotes: role === B2BRoles.ADMIN || role === B2BRoles.PURCHASER,
    ViewAddEditAccountInHierarchy: role === B2BRoles.ADMIN,
  }
}

interface AccessWrapperProps {
  name: string
  b2BUserRole?: string
  quoteStatus?: string
  quoteMode?: string
  hasDraft?: boolean
  children: any
}

// wrap it around any Node that needs to be conditionally rendered based on user role, quote status, or quote mode
const AccessWrapper = (props: AccessWrapperProps) => {
  const { user } = useAuthContext()
  const { name, b2BUserRole = user?.roleName, quoteStatus, quoteMode, hasDraft } = props

  const shouldShow = AccessManager(b2BUserRole, quoteStatus, quoteMode, hasDraft)[name]

  return shouldShow ? props.children : null
}

export default AccessWrapper
