const getCustomerAccountsQuery = /* GraphQL */ `
  query customerAccounts($filter: String) {
    customerAccounts(filter: $filter) {
      items {
        userId
        userName
        firstName
        lastName
      }
    }
  }
`
export default getCustomerAccountsQuery
