import { CustomerPurchaseOrderAccount } from '@/lib/gql/types'

export const customerPurchaseOrderMock: {
  customerPurchaseOrderAccount: CustomerPurchaseOrderAccount
} = {
  customerPurchaseOrderAccount: {
    accountId: 1437,
    id: 27953526,
    availableBalance: 8149.42,
    totalAvailableBalance: 9149.42,
    creditLimit: 10000,
    customerPurchaseOrderPaymentTerms: [
      {
        code: '60',
        description: '60',
        siteId: 41315,
      },
      {
        code: '90',
        description: '90',
        siteId: 41315,
      },
    ],
  },
}
