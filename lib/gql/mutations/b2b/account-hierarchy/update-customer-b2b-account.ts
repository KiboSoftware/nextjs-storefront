const updateCustomerB2bAccountMutation = /* GraphQL */ `
  mutation updateCustomerB2bAccount($accountId: Int!, $b2BAccountInput: B2BAccountInput) {
    updateCustomerB2bAccount(accountId: $accountId, b2BAccountInput: $b2BAccountInput) {
      id
      taxId
      parentAccountId
      companyOrOrganization
    }
  }
`

export default updateCustomerB2bAccountMutation
