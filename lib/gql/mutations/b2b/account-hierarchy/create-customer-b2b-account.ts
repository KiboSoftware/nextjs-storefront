const createCustomerB2bAccountMutation = /* GraphQL */ `
  mutation createCustomerB2bAccount($b2BAccountInput: B2BAccountInput) {
    createCustomerB2bAccount(b2BAccountInput: $b2BAccountInput) {
      id
      taxId
      parentAccountId
      companyOrOrganization
    }
  }
`

export default createCustomerB2bAccountMutation
