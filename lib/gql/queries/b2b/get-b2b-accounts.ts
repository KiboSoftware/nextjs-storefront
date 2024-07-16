const getB2bAccounts = /* GraphQL */ `
  query getB2bAccounts(
      $filter: String
    ) {
    b2bAccounts(
      filter: $filter
    ) {
      totalCount
      startIndex
      pageSize
      pageCount
      items {
        id
        companyOrOrganization
      }
    }
  }
`

export default getB2bAccounts
