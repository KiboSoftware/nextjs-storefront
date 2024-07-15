const getAccountsByUser = /* GraphQL */ `
  query getAccountsByUser($emailAddress: String) {
    accountsByUser: getAccountsByUser(emailAddress: $emailAddress)
  }
`

export default getAccountsByUser
