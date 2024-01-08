const getB2BAccount = /* GraphQL */ `
  query b2bAccount($accountId: Int!) {
    b2bAccount(accountId: $accountId) {
      companyOrOrganization
      users {
        firstName
        lastName
        userId
      }
    }
  }
`

export default getB2BAccount
