const getCustomerPurchaseOrderQuery = /* GraphQL */ `
  query customerPurchaseOrderAccount($accountId: Int!) {
    customerPurchaseOrderAccount(accountId: $accountId) {
      id
      accountId
      creditLimit
      availableBalance
      totalAvailableBalance
      isEnabled
      overdraftAllowance
      overdraftAllowanceType
      customerPurchaseOrderPaymentTerms {
        code
        siteId
        description
      }
    }
  }
`
export default getCustomerPurchaseOrderQuery
