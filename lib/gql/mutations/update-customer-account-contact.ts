import { userContactFields } from '../fragments/userContacts'

const updateCustomerAccountContact = /* GraphQL */ `
  ${userContactFields}

  mutation updateUserAddress(
    $accountId: Int!
    $contactId: Int!
    $userId: String
    $customerContactInput: CustomerContactInput!
  ) {
    updateCustomerAccountContact(
      accountId: $accountId
      contactId: $contactId
      userId: $userId
      customerContactInput: $customerContactInput
    ) {
      ...userContactFields
    }
  }
`
export default updateCustomerAccountContact
