const getB2bAccounts = /* GraphQL */ `
 
  query customerAccount(
      $accountId: Int!
    ) {
    customerAccount(
      accountId: $accountId
    ) {
      id
      companyOrOrganization
      emailAddress
      accountType
    }
  }

`

export default getB2bAccounts
