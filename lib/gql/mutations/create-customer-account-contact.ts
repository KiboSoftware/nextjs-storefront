import { userContactFields } from '../fragments/userContacts'

const createCustomerAccountContact = /* GraphQL */ `
  ${userContactFields}

  mutation addUserAddress($accountId: Int!, $customerContactInput: CustomerContactInput!) {
    createCustomerAccountContact(
      accountId: $accountId
      customerContactInput: $customerContactInput
    ) {
      ...userContactFields
    }
  }
`

export default createCustomerAccountContact
