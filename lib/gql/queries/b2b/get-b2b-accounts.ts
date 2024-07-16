const getB2bAccounts = /* GraphQL */ `
 
  query {
    customerAccount(
      accountId: 1306
    ) {
      id
      companyOrOrganization
      emailAddress
    }
  }

`

export default getB2bAccounts
