export const quoteAuditInfoFragment = `
fragment quoteAuditInfoFragment on CrAuditInfo {
    updateDate
    createDate
    updateBy
    createBy
} 
`

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
        ...quoteCommentsFragment
    }
  }


  ${quoteCommentsFragment}
`
