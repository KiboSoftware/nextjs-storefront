export const deleteCustomerAccountContact = /* GraphQL */ `
  mutation deleteUserAddress($accountId: Int!, $contactId: Int!) {
    deleteCustomerAccountContact(accountId: $accountId, contactId: $contactId)
  }
`

export default deleteCustomerAccountContact
