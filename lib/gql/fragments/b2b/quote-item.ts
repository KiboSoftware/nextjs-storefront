import { quoteAuditInfoFragment } from './quote-audit-info'

export const quoteCommentsFragment = `
fragment quoteCommentsFragment on QuoteComment {
    id
    text
    auditInfo {
        ...quoteAuditInfoFragment
    }
} 

${quoteAuditInfoFragment}
`

export const quoteItemFragment = `
fragment quoteItemFragment on Quote {
    id
    number
    name
    status
    total
    expirationDate
    comments {
        id
        text
        auditInfo {
            ...quoteAuditInfoFragment
        }
    }
    auditInfo {
        ...quoteAuditInfoFragment
    }
  }

    ${quoteAuditInfoFragment}
`
