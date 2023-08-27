const changeB2bAccountParentMutation = /* GraphQL */ `
  mutation changeB2BAccountParent($accountId: Int!, $parentAccountId: Int!) {
    changeB2BAccountParent(accountId: $accountId, parentAccountId: $parentAccountId) {
      id
      taxId
      parentAccountId
      companyOrOrganization
    }
  }
`

export default changeB2bAccountParentMutation
