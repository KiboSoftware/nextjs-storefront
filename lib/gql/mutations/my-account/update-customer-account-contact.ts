import { userContactFields } from '@/lib/gql/fragments/userContacts'

const updateCustomerAccountContact = /* GraphQL */ `
  ${userContactFields}

  mutation updateCustomerAccountContact(
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
