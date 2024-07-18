const getCustomerAccount = /* GraphQL */ `
  query customerAccount($accountId: Int!) {
    customerAccount(accountId: $accountId) {
      id
      companyOrOrganization
      emailAddress
      accountType
    }
  }
`

export default getCustomerAccount
