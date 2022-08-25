import { userContactFields } from '@/lib/gql/fragments/userContacts'

const createCustomerAccountContact = /* GraphQL */ `
  ${userContactFields}

  mutation createCustomerAccountContact(
    $accountId: Int!
    $customerContactInput: CustomerContactInput!
  ) {
    createCustomerAccountContact(
      accountId: $accountId
      customerContactInput: $customerContactInput
    ) {
      ...userContactFields
    }
  }
`
export default createCustomerAccountContact
