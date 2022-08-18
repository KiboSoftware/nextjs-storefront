const deleteCustomerAccountContact = /* GraphQL */ `
  mutation deleteCustomerAccountContact($accountId: Int!, $contactId: Int!) {
    deleteCustomerAccountContact(accountId: $accountId, contactId: $contactId)
  }
`
export default deleteCustomerAccountContact
